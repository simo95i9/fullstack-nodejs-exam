import * as account_repository from 'backend/models/account.js'
import { hash, verify } from 'argon2'
import { http_status_codes } from 'shared/utils.js'

/**
 * @param request
 * @param response
 * @return {void}
 */
export function get_current_session(request, response) {
    if (!('account' in request.session)) {
        response.send({ success: true, data: null })
        return
    }
    response.send({ success: true, data: { ...request.session.account, password: null } })
}

export function deauthenticate_session(request, response) {
    request.session.destroy()

    response.status(http_status_codes.success.ok)
    response.send({ success: true, data: {} })
}

export async function authenticate_session(request, response) {
    // Validate that body has required fields
    if (!('email' in request.body) && !('password' in request.body)) {
        response.status(http_status_codes.client_error.bad_request)
        response.send({ success: false, error: 'missing some of required fields: "user", "password"' })
        return
    }

    // Abort if no account exists with provided email
    // error message is imprecise on purpose to make it harder to enumerate account
    if (!account_repository.exists_by_email(request.body['email'])) {
        response.status(http_status_codes.client_error.not_found)
        response.send({ success: false, error: 'incorrect email or password' })
        return
    }

    // Abort if password doesn't match
    // error message is imprecise on purpose to make it harder to enumerate accounts
    const account = account_repository.get_by_email(request.body['email'])
    if (!(await verify(account.password, request.body['password']))) {
        response.status(http_status_codes.client_error.not_found)
        response.send({ success: false, error: 'incorrect email or password' })
        return
    }

    // All good! Store the account in the session
    request.session.account = account

    // Let the client know the details of the account, except the password
    response.status(http_status_codes.success.ok)
    response.send({ success: true, data: { ...account, password: null } })
}

export async function create_new_account(request, response) {
    // Validate that signup request has required fields
    if (
        !('email' in request.body) &&
        typeof request.body['email'] !== 'string' &&
        !('password' in request.body) &&
        typeof request.body['password'] !== 'string' &&
        !('full_name' in request.body) &&
        typeof request.body['full_name'] !== 'string' &&
        !('display_name' in request.body) &&
        typeof request.body['display_name'] !== 'string'
    ) {
        response.status(http_status_codes.client_error.bad_request)
        response.send({
            success: false,
            error: 'missing required fields: "full_name", "display_name", "email", "password"',
        })
        return
    }

    // Try to create the account in the database
    const account_signup_request = {
        email: request.body['email'],
        password: await hash(request.body['password']),
        full_name: request.body['full_name'],
        display_name: request.body['display_name'],
    }
    const account = account_repository.create_new(account_signup_request)

    // Let the client known if creation failed
    if (account === null) {
        response.status(http_status_codes.server_error.internal_server_error)
        response.send({ success: false, error: 'unable to create account in database' })
        return
    }

    // Add the account to the session so that the user is automatically signed in.
    request.session.account = account

    // All good! Let the client known the details of the account, except password
    response.status(http_status_codes.success.ok)
    response.send({ success: true, data: { ...account, password: null } })
}