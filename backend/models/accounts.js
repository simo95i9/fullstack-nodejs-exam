import { randomUUID } from 'crypto'
import { Temporal } from 'temporal-polyfill'

import { Logger, undent } from 'shared/utils.js'
import { database } from 'backend/config.js'

const logger = new Logger('models::account')

export const table_name = 'accounts'
const create_table_sql = undent`
    CREATE TABLE accounts
    (
        id                VARCHAR(24)   PRIMARY KEY,
        email             VARCHAR(256)  NOT NULL UNIQUE,
        password          VARCHAR(256)  NOT NULL,
        full_name         VARCHAR(256)  NOT NULL,
        display_name      VARCHAR(64)   NOT NULL,
        admin             BOOLEAN       NOT NULL,

        datetime_created  VARCHAR(32)   NOT NULL,
        datetime_modified VARCHAR(32)   NULL,
        datetime_deleted  VARCHAR(32)   NULL,

        picture           TEXT          NULL
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
    const required_fields = ['email', 'password', 'full_name', 'display_name', 'picture']
    const success = required_fields.every((prop) => prop in body)

    return {
        success,
        error: `missing some of required fields: ${required_fields.map((f) => '"' + f + '"').join(', ')}`,
    }
}

/**
 * @typedef {Object} AccountSignUpRequest
 * @property {String} email
 * @property {String} password
 * @property {String} full_name
 * @property {String} display_name
 * @property {String} picture
 * */

/**
 * @typedef {Object} Account
 * @property {String} id
 * @property {String} email
 * @property {String} password
 * @property {String} full_name
 * @property {String} display_name
 * @property {import('temporal-polyfill').Temporal.PlainDateTime} datetime_created
 * @property {import('temporal-polyfill').Temporal.PlainDateTime} datetime_modified
 * @property {import('temporal-polyfill').Temporal.PlainDateTime} datetime_deleted
 * @property {Boolean} admin
 * @property {String} picture
 * */


/**
 * @return {Account[]}
 * */
export function get_all() {
    const select_statement = database.prepare(undent`
        SELECT *
        FROM accounts
    `)
    const result = select_statement.all()
    return result
}


/**
 * @param {String} id
 * @return {boolean}
 * */
export function exists_by_id(id) {
    const select_statement = database.prepare(undent`
        SELECT *
        FROM accounts
        WHERE id = $id
    `)
    const result = select_statement.get({ id: id })
    return !!result
}

/**
 * @param {String} id
 * @return {Account|null}
 * */
export function get_by_id(id) {
    const select_statement = database.prepare(undent`
        SELECT *
        FROM accounts
        WHERE id = $id
    `)
    const result = select_statement.get({ id })
    return result ? { ...result } : null
}

/**
 * @param {String} email
 * @return {boolean}
 * */
export function exists_by_email(email) {
    const select_statement = database.prepare(undent`
        SELECT *
        FROM accounts
        WHERE email = $email
          AND datetime_deleted IS NULL
    `)
    const result = select_statement.get({ email })
    return !!result
}

/**
 * @param {String} email
 * @return {Account|null}
 * */
export function get_by_email(email) {
    const select_statement = database.prepare(undent`
        SELECT *
        FROM accounts
        WHERE email = $email
    `)
    const result = select_statement.get({ email: email })
    return result ? { ...result } : null
}

/**
 * @param {AccountSignUpRequest} account_signup_request
 * @return {Account|null}
 * */
export function create_new(account_signup_request) {
    /** @type Account */
    const account = {
        id: randomUUID(),
        email: account_signup_request.email,
        password: account_signup_request.password,
        full_name: account_signup_request.full_name,
        display_name: account_signup_request.display_name,
        admin: false,
        picture: account_signup_request.picture,
        datetime_created: Temporal.Now.plainDateTimeISO(),
        datetime_modified: null,
        datetime_deleted: null,
    }

    const insert_statement = database.prepare(
        undent`
            INSERT INTO accounts (id, email, password, full_name, display_name, admin, picture, datetime_created,
                                  datetime_modified, datetime_deleted)
            VALUES ($id, $email, $password, $full_name, $display_name, $admin, $picture, $datetime_created,
                    $datetime_modified, $datetime_deleted)
        `,
    )
    const insert_result = insert_statement.run({
        id: String(account.id),
        email: String(account.email),
        password: String(account.password),
        full_name: String(account.full_name),
        display_name: String(account.display_name),
        admin: Number(account.admin),
        picture: String(account.picture),
        datetime_created: account.datetime_created ? String(account.datetime_created) : null,
        datetime_modified: account.datetime_modified ? String(account.datetime_modified) : null,
        datetime_deleted: account.datetime_deleted ? String(account.datetime_deleted) : null,
    })
    logger.debug(insert_result)

    return account
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
export function is_authenticated(request, response, next) {
    if (!('account' in request.session)) {
        throw new Error('this routes requires authentication')
    }

    if (!exists_by_id(request.session.account.id)) {
        throw new Error("this account doesn't exists")
    }

    next()
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
export function is_administrator(request, response, next) {
    if (!('account' in request.session)) {
        throw new Error('this routes requires authentication')
    }

    if (!exists_by_id(request.session.account.id)) {
        throw new Error("this account doesn't exists")
    }

    if (!get_by_id(request.session.account.id).admin) {
        throw new Error('this route requires administrator privileges')
    }

    next()
}
