import { get, post } from 'frontend/src/api/api.js'
import { Temporal } from 'temporal-polyfill'

/**
 * @param {String} id
 * @return {Promise<Event|null>}
 */
export async function get_by_id({ id }) {
    /** @type {ApiResponse.<Event>} */
    const response = await get(`/api/events/${id}`)
    if (!response.success) {
        // TODO: report error in toast like thing
        return null
    }
    return response.data
}

/**
 * @param {String} event_id
 * @return {Promise<Tag[]>}
 */
export async function get_tags_by_event_id({ event_id }) {
    /** @type {ApiResponse.<Tag[]>} */
    const response = await get(`/api/events/${event_id}/tags`)
    if (!response.success) {
        // TODO: report error in toast like thing
        return []
    }
    return response.data
}

/**
 * @param {String} account_id
 * @return {Promise<Event[]>}
 */
export async function get_by_account_id({ account_id }) {
    /** @type {ApiResponse.<Event[]>} */
    const response = await get(`/api/accounts/${account_id}/events`)
    if (!response.success) {
        // TODO: report error in toast like thing
        return []
    }
    return response.data
}

/**
 * @return {Promise<Event[]>}
 */
export async function get_all() {
    /** @type {ApiResponse.<Event[]>} */
    const response = await get('/api/events/all')
    if (!response.success) {
        // TODO: report error in toast like thing
        return []
    }
    return response.data
}

/**
 * @param {String} title
 * @param {String[]} tag_ids
 * @param {String} begin
 * @param {String} end
 * @return {Promise<Event|null>}
 */
export async function create_new({ title, tag_ids, begin, end }) {
    /** @type {ApiResponse.<Event>} */
    const response = await post('/api/events/', {
        name: title,
        tag_ids,
        zoned_datetime_begin: Temporal.PlainDateTime.from(begin).toZonedDateTime(Temporal.Now.timeZoneId()).toString(),
        zoned_datetime_end: Temporal.PlainDateTime.from(end).toZonedDateTime(Temporal.Now.timeZoneId()).toJSON(),
    })
    if (!response.success) {
        // TODO: report error in toast like thing
        console.dir(response)
        return null
    }
    return response.data
}
