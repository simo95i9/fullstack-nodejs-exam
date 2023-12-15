import { get, post } from 'frontend/src/api/api.js'

/**
 * @typedef {Object} Event
 * @property {String} id
 * @property {String} name
 * @property {String} datetime_begin
 * @property {String} datetime_end
 * @property {String} datetime_created
 * @property {String} datetime_modified
 * @property {String} datetime_deleted
 * */


export async function get_all() {
    const response = await get('/api/events/all')
    if (!response.success) {
        // TODO: report error in toast like thing
    }

    return response

}

export async function create_new({name, datetime_begin, datetime_end}) {
    const response = await get('/api/events/all')
    if (!response.success) {
        // TODO: report error in toast like thing
    }

    return response

}