import { Router, json } from 'express'

export const router = Router()
router.use(json({limit: '10mb'}))

router.get('/', get_current_session)
router.post('/signin', authenticate_session)
router.post('/signout', deauthenticate_session)
router.post('/signup', create_new_account)


import * as account_repository from 'backend/models/accounts.js'
import { hash, verify } from 'argon2'
import { bufferToBase64DataUrl, http_status_codes } from 'shared/utils.js'
import sharp from 'sharp'

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function get_current_session(request, response, next) {
    if (!('account' in request.session)) {
        response.json({ success: true, data: null })
        return
    }

    if (!account_repository.exists_by_id(request.session.account.id)) {
        response.json({ success: true, data: null })
        return
    }

    const account = account_repository.get_by_id(request.session.account.id)
    response.json({ success: true, data: { ...account, password: null } })
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function deauthenticate_session(request, response, next) {
    request.session.destroy(() => { })

    response.status(http_status_codes.success.ok)
    response.send({ success: true, data: null })
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
async function authenticate_session(request, response, next) {
    // Validate that body has required fields
    if (!('email' in request.body) && !('password' in request.body)) {
        response.status(http_status_codes.client_error.bad_request)
        response.send({
            success: false,
            error: 'missing some of required fields: "user", "password"',
        })
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

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
async function create_new_account(request, response, next) {
    // Validate that signup request has required fields
    const result = account_repository.validate_request_body(request.body)
    if (!result.success) {
        response.status(http_status_codes.client_error.bad_request).json(result)
        return
    }

    const dataurl = await fetch(request.body.picture)
    const original_image = await dataurl.arrayBuffer()
    const resized_image = await sharp(original_image).resize({height: 320, width: 320}).avif().toBuffer()

    // Try to create the account in the database
    /** @type {AccountSignUpRequest} */
    const account_signup_request = {
        email: request.body['email'],
        password: await hash(request.body['password']),
        full_name: request.body['full_name'],
        display_name: request.body['display_name'],
        picture: await bufferToBase64DataUrl(resized_image, 'image/avif')
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
