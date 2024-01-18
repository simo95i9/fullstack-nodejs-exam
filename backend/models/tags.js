import { randomUUID } from 'crypto'
import { Temporal } from 'temporal-polyfill'

import { Logger, undent } from 'shared/utils.js'
import { database } from 'backend/config.js'

const logger = new Logger('models::tags')

const table_name = 'tags'
const create_table_sql = undent`
    CREATE TABLE tags
    (
        id                VARCHAR(24) PRIMARY KEY,
        type              VARCHAR(256) NOT NULL,
        name              VARCHAR(256) NOT NULL,

        datetime_created  VARCHAR(32)  NOT NULL,
        datetime_modified VARCHAR(32)  NULL,
        datetime_deleted  VARCHAR(32)  NULL,

        CONSTRAINT unique_type_name UNIQUE (type, name)
    )
`
const validate_table_sql = undent`
    SELECT sql
    FROM sqlite_master
    WHERE type IS 'table'
      AND name IS $name;
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

export function validate_request_body(body) {
    const required_fields = ['type', 'name']
    const success = required_fields.every((prop) => prop in body)

    return {
        success,
        error: `missing some of required fields: ${required_fields.map((f) => `'${f}'`).join(', ')}`,
    }
}

/**
 * @typedef {Object} TagCreationRequest
 * @property {String} type
 * @property {String} name
 * */

/**
 * @typedef {Object} Tag
 * @property {String} id
 * @property {String} type
 * @property {String} name
 * @property {import('temporal-polyfill').Temporal.PlainDateTime} datetime_created
 * @property {import('temporal-polyfill').Temporal.PlainDateTime} datetime_modified
 * @property {import('temporal-polyfill').Temporal.PlainDateTime} datetime_deleted
 * */

/**
 *  @return {Tag[]}
 * */
export function get_all() {
    const select_statement = database.prepare(undent`
        SELECT *
        FROM tags
    `)
    const result = select_statement.all()
    return result
}

/**
 * @param {String} id
 * @return {boolean}
 * */
export function exists_by_id(id) {
    return !!get_by_id(id)
}

/**
 * @param {String} id
 * @return {Tag|null}
 * */
export function get_by_id(id) {
    const select_statement = database.prepare(undent`
        SELECT *
        FROM tags
        WHERE id = $id
    `)
    const result = select_statement.get({ id })
    return result ? { ...result } : null
}

/**
 * @param {String} event_id
 * @return {Tag[]}
 * */
export function get_by_event_id({ event_id }) {
    const select_statement = database.prepare(undent`
        SELECT tags.id, tags.type, tags.name, tags.datetime_created, tags.datetime_modified, tags.datetime_deleted
        FROM tags
        JOIN junction__events__tags ON tags.id = junction__events__tags.tag_id
        WHERE junction__events__tags.event_id = $event_id
        ORDER BY tags.type, tags.name
    `)
    const result = select_statement.all({ event_id })
    return result
}

/**
 * @param {String} type
 * @return {Tag[]}
 * */
export function get_by_type(type) {
    const select_statement = database.prepare(undent`
        SELECT *
        FROM tags
        WHERE type = $type
        ORDER BY name
    `)
    const result = select_statement.all({ type })
    return result
}

/**
 * @param {TagCreationRequest} tag_creation_request
 * @return {Tag|null}
 * */
export function create_new(tag_creation_request) {
    /** @type Tag */
    const tag = {
        id: randomUUID(),
        type: tag_creation_request.type,
        name: tag_creation_request.name,
        datetime_created: Temporal.Now.plainDateTimeISO(),
        datetime_modified: null,
        datetime_deleted: null,
    }

    const insert_statement = database.prepare(undent`
        INSERT INTO tags (id, type, name, datetime_created, datetime_modified, datetime_deleted)
        VALUES ($id, $type, $name, $datetime_created, $datetime_modified, $datetime_deleted)
    `)
    const insert_result = insert_statement.run({
        id: String(tag.id),
        type: String(tag.type),
        name: String(tag.name),
        datetime_created: tag.datetime_created ? String(tag.datetime_created) : null,
        datetime_modified: tag.datetime_modified ? String(tag.datetime_modified) : null,
        datetime_deleted: tag.datetime_deleted ? String(tag.datetime_deleted) : null,
    })
    logger.debug(insert_result)

    return tag
}

/**
 * @param {String} id
 * @return {Tag}
 */
export function delete_by_id(id) {
    const delete_statement = database.prepare(undent`
        DELETE
        FROM tags
        WHERE id = $id
        RETURNING *
    `)

    const delete_result = delete_statement.get({ id })
    return delete_result
}
