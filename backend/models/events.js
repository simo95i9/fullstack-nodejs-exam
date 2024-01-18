import { randomUUID } from 'crypto'
import { Temporal } from 'temporal-polyfill'

import { undent, Logger } from 'shared/utils.js'
const logger = new Logger('models::account')

import { database } from 'backend/config.js'

const table_name = 'events'
const create_table_sql = undent`
        CREATE TABLE events (
            id VARCHAR(24)                      PRIMARY KEY,
            account_id VARCHAR(24)              NOT NULL,
            
            name VARCHAR(256)                   NOT NULL,
            zoned_datetime_begin VARCHAR(128)   NOT NULL,
            zoned_datetime_end VARCHAR(128)     NOT NULL,
            
            datetime_created VARCHAR(32)        NOT NULL,
            datetime_modified VARCHAR(32)       NULL,
            datetime_deleted VARCHAR(32)        NULL,
            
            CONSTRAINT fk__account_id FOREIGN KEY(account_id) REFERENCES accounts(id)
        )
`
const validate_table_sql = undent`
        SELECT sql FROM sqlite_master
        WHERE type IS 'table' AND name IS $name;
`

export function create_database_table() {
    const create_table_statement = database.prepare(create_table_sql)
    const create_table_result = create_table_statement.run()
    logger.trace(create_table_result)
}

export function database_table_exists() {
    const validate_table_statement = database.prepare(validate_table_sql)
    const result = validate_table_statement.get({ name: table_name })

    if (!result) {
        logger.warn(`Could not find table '${table_name}'`)
        return false
    }

    return true
}

export function database_table_is_valid() {
    const validate_table_statement = database.prepare(validate_table_sql)
    const result = validate_table_statement.get({ name: table_name })

    if (result['sql'] !== create_table_sql) {
        logger.warn(
            `Invalid columns in table '${table_name}'\n` +
            `Expected: ${create_table_sql} \n` +
            `Found: ${result['sql']}`,
        )
        return false
    }

    return true
}

export function validate_request_body(body) {
    const required_fields = ['name', 'tag_ids', 'zoned_datetime_begin', 'zoned_datetime_end']
    const success = required_fields.every(prop => prop in body)

    return {
        success,
        error: `missing some of required fields: ${required_fields.map(f => '"'+f+'"').join(', ')}`,
    }
}


/**
 * @typedef {Object} EventCreationRequest
 * @property {String} name
 * @property {String[]} tag_ids
 * @property {Temporal.ZonedDateTime} zoned_datetime_begin
 * @property {Temporal.ZonedDateTime} zoned_datetime_end
 */


/**
 * @typedef {Object} Event
 * @property {String} id
 * @property {String} account_id
 *
 * @property {String} name
 * @property {Temporal.ZonedDateTime} zoned_datetime_begin
 * @property {Temporal.ZonedDateTime} zoned_datetime_end
 *
 * @property {Temporal.PlainDateTime} datetime_created
 * @property {Temporal.PlainDateTime} datetime_modified
 * @property {Temporal.PlainDateTime} datetime_deleted
 * */


/**
 * @param {String} id
 * @return {Boolean}
 */
export function exists_by_id({ id }) {
    const select_statement = database.prepare(undent`
        SELECT * FROM events WHERE id = $id AND datetime_deleted IS NULL
    `)
    const result = select_statement.get({ id })
    return !!result
}

/**
 * @param {String} id
 * @return {Event|null}
 * */
export function get_by_id({ id }) {
    const select_statement = database.prepare(undent`
        SELECT * FROM events WHERE id = $id AND datetime_deleted IS NULL
    `)
    const result = select_statement.get({ id })
    return result ? { ...result } : null
}


/**
 * @return {Event[]}
 */
export function get_all() {
    const select_statement = database.prepare(undent`
        SELECT * FROM events WHERE datetime_deleted IS NULL
    `)
    const result = select_statement.all({ })
    return result
}


/**
 * @param {String} account_id
 * @return {Event[]}
 */
export function get_by_account_id({ account_id}) {
    const select_statement = database.prepare(undent`
        SELECT events.id,
               events.account_id,
               events.name,
               events.zoned_datetime_begin,
               events.zoned_datetime_end,
               events.datetime_created,
               events.datetime_modified,
               events.datetime_deleted
        FROM events
                 LEFT JOIN accounts ON events.account_id = accounts.id
        WHERE events.account_id = $account_id
          AND events.datetime_deleted IS NULL
          AND accounts.datetime_deleted IS NULL
    `)
    const result = select_statement.all({ account_id })
    return result
}

/**
 * @param {EventCreationRequest} event_creation_request
 * @param {String} account_id
 * @return {Event|null}
 */
export function create_new(event_creation_request, account_id) {
    /** @type Event */
    const event = {
        id: randomUUID(),
        account_id: account_id,
        name: event_creation_request.name,
        zoned_datetime_begin: Temporal.ZonedDateTime.from(event_creation_request.zoned_datetime_begin),
        zoned_datetime_end: Temporal.ZonedDateTime.from(event_creation_request.zoned_datetime_end),

        datetime_created: Temporal.Now.plainDateTimeISO(),
        datetime_modified: null,
        datetime_deleted: null,
    }

    const event_statement = database.prepare(
        undent`
            INSERT INTO events (id, account_id, name, zoned_datetime_begin, zoned_datetime_end, datetime_created, datetime_modified, datetime_deleted)
            VALUES ($id, $account_id, $name, $zoned_datetime_begin, $zoned_datetime_end, $datetime_created, $datetime_modified, $datetime_deleted)
        `,
    )
    const relation_statement = database.prepare(
        undent`
            INSERT INTO junction__events__tags (event_id, tag_id)
            VALUES ($event_id, $tag_id)
        `,
    )

    const event_result = event_statement.run({
        id: String(event.id),
        account_id: String(event.account_id),
        name: String(event.name),
        zoned_datetime_begin: event.zoned_datetime_begin.toString(),
        zoned_datetime_end: event.zoned_datetime_end.toString(),
        datetime_created: event.datetime_created ? String(event.datetime_created) : null,
        datetime_modified: event.datetime_modified ? String(event.datetime_modified) : null,
        datetime_deleted: event.datetime_deleted ? String(event.datetime_deleted) : null,
    })
    logger.debug(event_result)

    event_creation_request.tag_ids.forEach(tag_id => {
        const relation_result = relation_statement.run({
            event_id: String(event.id),
            tag_id: String(tag_id),
        })
        logger.debug(relation_result)
    })

    return event
}
