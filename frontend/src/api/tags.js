import { delet, get, post } from './api.js'


/**
 * @return {Promise<Tag[]>}
 */
export async function get_all() {
    /** @type {ApiResponse.<Tag[]>} */
    const response = await get('/api/tags/all')
    if (!response.success) {
        // TODO: report error in toast like thing
        return []
    }

    return response.data
}


/**
 * @param {String} type
 * @return {Promise<Tag[]>}
 */
export async function get_by_type(type) {
    /** @type {ApiResponse.<Tag[]>} */
    const response = await get(`/api/tags/type/${type}`)
    if (!response.success) {
        // TODO: report error in toast like thing
        return []
    }

    return response.data
}

/**
 * @param {String} type
 * @param {String} name
 * @return {Promise<void>}
 */
export async function create_new({type, name}) {
    /** @type {ApiResponse.<Tag>} */
    const response = await post('/api/tags/', { type, name })
    if (!response.success) {
        // TODO: report error in toast like thing
    }
}

/**
 * @param {String} id
 * @return {Promise<Tag>}
 */
export async function delete_tag({ id }) {
    /** @type {ApiResponse.<Tag>} */
    const response = await delet(`/api/tags/id/${ id }`)
    if (!response.success) {
        // TODO: report error in toast like thing
    }
    return response.data
}
