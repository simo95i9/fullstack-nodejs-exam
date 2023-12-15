import { Router, json } from 'express'
export const router = Router()
router.use(json)

router.get('/all', get_all)
router.get('/latest', get_latest)
router.get('/hot', get_hot)
router.post('/', create_event)
router.put('/:event_id', update_event)

import * as event_repository from 'backend/models/event.js'
import { http_status_codes } from 'shared/utils.js'


/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function get_all(request, response, next) {
    const events = event_repository.get_all()
    response.json(events)
}


/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function get_latest(request, response, next) {
    const result = { success: false, data: 'get_latest() not implemented'}
    response.status(http_status_codes.server_error.internal_server_error).json(result)
}


/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function get_hot(request, response, next) {
    const result = { success: false, data: 'get_hot() not implemented'}
    response.status(http_status_codes.server_error.internal_server_error).json(result)
}


/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function create_event(request, response, next) {
    const result = event_repository.validate_request_body(request.body)
    if (!result.success) {
        response.status(http_status_codes.server_error.internal_server_error).json(result)
        return
    }

    const event = event_repository.create_new(request.body)
    if (!event.success) {
        response.status(http_status_codes.server_error.internal_server_error).json(event)
        return
    }

    response.status(http_status_codes.success.ok).json(event)
}


/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function update_event(request, response, next) {
    const result = { success: false, data: 'update_event() not implemented'}
    response.status(http_status_codes.server_error.internal_server_error).json(result)
}