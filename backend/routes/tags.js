import { Router, json } from 'express'
export const router = Router()
router.use(json())


import { Logger } from 'shared/utils.js'
const logger = new Logger('backend/tags')


router.get('/', get_all)
router.get('/id/:tag_id', get_by_id)
router.get('/type/:type_name', get_by_type)
router.post('/', is_administrator, create_new)
router.delete('/id/:tag_id', delete_by_id)


import * as tag_repository from 'backend/models/tags.js'
import { http_status_codes } from 'shared/utils.js'
import { is_administrator } from '../models/accounts.js'
/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function get_all(request, response, next) {
    const tags = tag_repository.get_all()
    response.json(tags)
}

/**
* @callback
* @param {import('express').Request} request
* @param {import('express').Response} response
* @param {import('express').NextFunction} next
*/
function get_by_id(request, response, next) {
    if (!('tag_id' in request.params)) {
        response.status(http_status_codes.client_error.bad_request).json({ success: false, error: 'missing ":tag_id" in path' })
        return
    }
    const tags = tag_repository.get_by_id(request.params.tag_id)
    response.json({ success: true, data: tags })
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function get_by_type(request, response, next) {
    if (!('type_name' in request.params)) {
        response.status(http_status_codes.client_error.bad_request).json({ success: false, error: 'missing ":type_name" in path' })
        return
    }

    const tags = tag_repository.get_by_type(request.params.type_name)
    response.json({ success: true, data: tags })
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function create_new(request, response, next) {
    console.log(request.body)
    const result = tag_repository.validate_request_body(request.body)
    console.log(result)
    if (!result.success) {
        response.status(http_status_codes.server_error.internal_server_error).json(result)
        return
    }

    const tag = tag_repository.create_new(request.body)
    if (!tag) {
        response.status(http_status_codes.server_error.internal_server_error).json(tag)
        return
    }
    response.json({ success: true, data: tag })
}

/**
 * @callback
 * @param {import('express').Request} request
 * @param {import('express').Response} response
 * @param {import('express').NextFunction} next
 */
function delete_by_id(request, response, next) {
    if (!('tag_id' in request.params)) {
        response.status(http_status_codes.client_error.bad_request).json({ success: false, error: 'missing ":tag_id" in path' })
        return
    }

    if (!tag_repository.exists_by_id(request.params.tag_id)) {
        response.status(http_status_codes.client_error.not_found).json({ success: false, error: 'given :tag_id does not exists' })
        return
    }

    response.json({ success: true, data: tag_repository.delete_by_id(request.params.tag_id) })
}
