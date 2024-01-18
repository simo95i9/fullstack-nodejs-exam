import { json, Router } from 'express'
import * as event_repository from 'backend/models/events.js'
import * as post_repository from 'backend/models/posts.js'
import * as tag_repository from 'backend/models/tags.js'
import { http_status_codes } from 'shared/utils.js'
import { is_authenticated } from '../models/accounts.js'

export const router = Router()
router.use(json())

router.get('/all', get_all)
router.get('/latest', get_latest)
router.get('/hot', get_hot)
router.get('/:event_id', get_by_id)
router.get('/:event_id/posts', get_posts)
router.get('/:event_id/tags', get_tags)

router.post('/', is_authenticated, create_new)
router.post('/:event_id/posts', is_authenticated, create_post)

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function get_all(request, response, next) {
    const events = event_repository.get_all()
    response.json({ success: true, data: events })
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function get_latest(request, response, next) {
    const result = { success: false, data: 'get_latest() not implemented' }
    response.status(http_status_codes.server_error.internal_server_error).json(result)
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function get_hot(request, response, next) {
    const result = { success: false, data: 'get_hot() not implemented' }
    response.status(http_status_codes.server_error.internal_server_error).json(result)
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function get_by_id(request, response, next) {
    if (!event_repository.exists_by_id({ id: request.params.event_id })) {
        response.status(http_status_codes.client_error.not_found).json({ success: false, error: 'no such event' })
        return
    }

    const event = event_repository.get_by_id({ id: request.params.event_id })
    response.json({ success: true, data: event })
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function get_posts(request, response, next) {
    if (!event_repository.exists_by_id({ id: request.params.event_id })) {
        response.status(http_status_codes.client_error.not_found).json({ success: false, error: 'no such event' })
        return
    }

    const posts = post_repository.get_by_event_id({ event_id: request.params.event_id })
    response.json({ success: true, data: posts })
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function get_tags(request, response, next) {
    if (!event_repository.exists_by_id({ id: request.params.event_id })) {
        response.status(http_status_codes.client_error.not_found).json({ success: false, error: 'no such event' })
        return
    }

    const posts = tag_repository.get_by_event_id({ event_id: request.params.event_id })
    response.json({ success: true, data: posts })
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function create_new(request, response, next) {
    const result = event_repository.validate_request_body(request.body)
    if (!result.success) {
        response.status(http_status_codes.client_error.bad_request).json(result)
        return
    }

    const event = event_repository.create_new(request.body, request.session.account.id)
    if (!event) {
        response.status(http_status_codes.server_error.internal_server_error).json({
            success: false,
            error: 'failed to create event',
        })
        return
    }

    response.json({ success: true, data: event })
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function create_post(request, response, next) {
    const result = post_repository.validate_request_body(request.body)
    if (!result.success) {
        response.status(http_status_codes.client_error.bad_request).json(result)
        return
    }

    if (!event_repository.exists_by_id({ id: request.params.event_id })) {
        response.status(http_status_codes.client_error.not_found).json({ success: false, error: 'no such event' })
        return
    }

    const event = event_repository.get_by_id({ id: request.params.event_id })
    if (request.session.account.id !== event.account_id) {
        response
            .status(http_status_codes.client_error.unauthorized)
            .json({ success: false, error: 'only the owner can post to event' })
        return
    }

    const post = post_repository.create_new(request.body, request.params.event_id)
    if (!post) {
        response.status(http_status_codes.server_error.internal_server_error).json({
            success: false,
            error: 'failed to create post',
        })
        return
    }

    response.json({ success: true, data: event })
}
