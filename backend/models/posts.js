import { randomUUID } from 'crypto'
import { Temporal } from 'temporal-polyfill'

import { Logger, undent } from 'shared/utils.js'
import { database, markdown } from 'backend/config.js'

const logger = new Logger('models::account')

const table_name = 'posts'
const create_table_sql = undent`
    CREATE TABLE posts
    (
        id                VARCHAR(24) PRIMARY KEY,
        event_id          VARCHAR(24) NOT NULL,
        content           TEXT        NOT NULL,
        datetime_created  VARCHAR(32) NOT NULL,
        datetime_modified VARCHAR(32) NULL,
        datetime_deleted  VARCHAR(32) NULL,

        CONSTRAINT fk__event_id FOREIGN KEY (event_id) REFERENCES events (id)
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
    const required_fields = ['content']
    const success = required_fields.every((prop) => prop in body)

    return {
        success,
        error: `missing some of required fields: ${required_fields.map((f) => '"' + f + '"').join(', ')}`,
    }
}

/**
 * @typedef {Object} PostCreationRequest
 * @property {String} content
 */

/**
 * @typedef {Object} Post
 * @property {String} id
 * @property {String} event_id
 * @property {String} content
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
        SELECT *
        FROM posts
        WHERE id = $id
          AND datetime_deleted IS NULL
    `)
    const result = select_statement.get({ id })
    return !!result
}

/**
 * @param {String} id
 * @return {Post|null}
 * */
export function get_by_id({ id }) {
    const select_statement = database.prepare(undent`
        SELECT *
        FROM posts
        WHERE id = $id
          AND datetime_deleted IS NULL
    `)
    const result = select_statement.get({ id })
    return result ? { ...result } : null
}

/**
 * @param {String} event_id
 * @return {Post[]}
 */
export function get_by_event_id({ event_id }) {
    const select_statement = database.prepare(undent`
        SELECT *
        FROM posts
        WHERE event_id = $event_id
          AND datetime_deleted IS NULL
    `)
    const result = select_statement.all({ event_id })
    return result
}

/**
 * @param {PostCreationRequest} post_creation_request
 * @param {String} event_id
 * @return {Post|null}
 */
export function create_new(post_creation_request, event_id) {
    /** @type Post */
    const post = {
        id: randomUUID(),
        event_id: event_id,
        content: markdown.render(post_creation_request.content),

        datetime_created: Temporal.Now.plainDateTimeISO(),
        datetime_modified: null,
        datetime_deleted: null,
    }

    const post_statement = database.prepare(
        undent`
            INSERT INTO posts (id, event_id, content, datetime_created, datetime_modified, datetime_deleted)
            VALUES ($id, $event_id, $content, $datetime_created, $datetime_modified, $datetime_deleted)
        `,
    )
    const post_result = post_statement.run({
        id: String(post.id),
        event_id: String(post.event_id),
        content: String(post.content),
        datetime_created: post.datetime_created ? String(post.datetime_created) : null,
        datetime_modified: post.datetime_modified ? String(post.datetime_modified) : null,
        datetime_deleted: post.datetime_deleted ? String(post.datetime_deleted) : null,
    })
    logger.debug(post_result)

    return post
}
