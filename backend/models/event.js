import { randomUUID } from 'crypto'
import { Temporal } from 'temporal-polyfill'

import { undent, Logger } from 'shared/utils.js'
const logger = new Logger('models::account')

import * as config from 'backend/config.js'
const database = config.database


export const table_name = 'events'
export const create_table_sql = undent`
        CREATE TABLE events (
            id VARCHAR(24)                  PRIMARY KEY,
            name VARCHAR(256)               NOT NULL,
            account_id VARCHAR(32)          NOT NULL,
            datetime_begin VARCHAR(32)      NOT NULL,
            datetime_end VARCHAR(32)        NOT NULL,
            
            datetime_created VARCHAR(32)    NOT NULL,
            datetime_modified VARCHAR(32)   NULL,
            datetime_deleted VARCHAR(32)    NULL,
            
            FOREIGN KEY(account_id) REFERENCES accounts(id)
        )
`
export const validate_table_sql = undent`
            SELECT sql FROM sqlite_master
            WHERE type IS 'table' AND name IS $name;
`

export function create_database_table() {
    const create_table_statement = database.prepare(create_table_sql)
    const result = create_table_statement.run()
    logger.trace(result)
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


/**
 * @typedef {Object} EventCreationRequest
 * @property {String} name
 * @property {Temporal.ZonedDateTime} datetime_begin
 * @property {Temporal.ZonedDateTime} datetime_end
 */


export function validate_request_body(body) {
    return ['name', 'datetime_begin', 'datetime_end']
        .every(prop => prop in body)
}


/**
 * @typedef {Object} Event
 * @property {String} id
 * @property {String} account_id
 *
 * @property {String} name
 * @property {Temporal.ZonedDateTime} datetime_begin
 * @property {Temporal.ZonedDateTime} datetime_end
 *
 * @property {Temporal.PlainDateTime} datetime_created
 * @property {Temporal.PlainDateTime} datetime_modified
 * @property {Temporal.PlainDateTime} datetime_deleted
 * */





/**
 * @return {Array<Event>}
 */
export function get_all() {
    const select_statement = database.prepare(undent`
        SELECT * FROM events WHERE datetime_deleted IS NULL
    `)
    const result = select_statement.all({})
    return result
}


/**
 * @param {String} account_id
 * @return {Array<Event>}
 */
export function get_by_account_id(account_id) {
    const select_statement = database.prepare(undent`
        SELECT (
            events.id,
            events.account_id,
            events.name,
            events.datetime_begin,
            events.datetime_end,
            events.datetime_created,
            events.datetime_modified,
            events.datetime_deleted
        ) FROM events NATURAL JOIN accounts
        WHERE
            events.account_id = $account_id
            and events.datetime_deleted IS NULL
            and accounts.datetime_deleted IS NULL
    `)
    const result = select_statement.all({ account_id })
    return result
}

/**
 * @param {EventCreationRequest} event_creation_request
 * @return {null|Event}
 */
export function create_new(event_creation_request) {
    /** @type Event */
    const event = {
        id: randomUUID(),
        account_id: event_creation_request.account_id,
        name: event_creation_request.name,
        datetime_begin: event_creation_request.datetime_begin,
        datetime_end: event_creation_request.datetime_end,

        datetime_created: Temporal.Now.plainDateTimeISO(),
        datetime_modified: null,
        datetime_deleted: null,
    }

    const insert_statement = database.prepare(
        undent`
            INSERT INTO events (id, account_id, name, datetime_begin, datetime_end, datetime_created, datetime_modified, datetime_deleted)
            VALUES ($id, $account_id, $name, $datetime_begin, $datetime_end, $datetime_created, $datetime_modified, $datetime_deleted)
        `,
    )
    const insert_result = insert_statement.run({
        id: String(event.id),
        account_id: String(event.account_id),
        name: String(event.name),
        datetime_begin: String(event.datetime_begin),
        datetime_end: String(event.datetime_end),
        datetime_created: event.datetime_created ? String(event.datetime_created) : null,
        datetime_modified: event.datetime_modified ? String(event.datetime_modified) : null,
        datetime_deleted: event.datetime_deleted ? String(event.datetime_deleted) : null,
    })
    logger.debug(insert_result)

    return account
}
