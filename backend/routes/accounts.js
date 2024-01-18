import { json, Router } from 'express'
import * as account_repository from 'backend/models/accounts.js'
import * as event_repository from 'backend/models/events.js'
import { http_status_codes } from 'shared/utils.js'
import { is_administrator } from 'backend/models/accounts.js'

export const router = Router()
router.use(json())

router.get('/', is_administrator, get_all)
router.get('/:account_id', get_by_id)
router.get('/:account_id/events', get_events)


/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function get_all(request, response, next) {
    const accounts = account_repository.get_all()
    response.json({ success: true, data: accounts })
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function get_by_id(request, response, next) {
    // since account ids are a 128bit uuid, I'm not too worried about account enumeration attacks
    if (!account_repository.exists_by_id(request.params.account_id)) {
        response.status(http_status_codes.client_error.not_found)
            .json({ success: false, error: 'no such account' })
        return
    }

    const account = account_repository.get_by_id(request.params.account_id)

    // Unauthenticated accounts get very little detail
    if (!('account' in request.session)) {
        response.json({
            success: true,
            data: {
                ...account,
                email: null,
                password: null,
                datetime_created: null,
                datetime_modified: null,
                datetime_deleted: null,
            },
        })
    }

    // The account owner and administrators get all the detail
    if (request.params.account_id === request.session.account.id || request.session.account.admin) {
        response.json({
            success: true,
            data: {
                ...account,
                password: null,
            },
        })
        return
    }

    // Authenticated accounts get a bit more detail
    if (account_repository.exists_by_id(request.session.account.id)) {
        response.json({
            success: true,
            data: {
                ...account,
                email: null,
                password: null,
            },
        })
        return
    }
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function get_events(request, response, next) {
    // since account ids are a 128bit uuid, I'm not too worried about account enumeration attacks
    if (!account_repository.exists_by_id(request.params.account_id)) {
        response.status(http_status_codes.client_error.not_found)
            .json({ success: false, error: 'no such account' })
        return
    }

    const events = event_repository.get_by_account_id({ account_id: request.params.account_id})
    response.json({ success: true, data: events })
}
