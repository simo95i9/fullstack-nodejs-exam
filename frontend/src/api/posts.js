import { get, post } from './api.js'

/**
 * @param {String} event_id
 * @return {Promise<Post[]>}
 */
export async function get_by_event_id({ event_id}) {
    /** @type {ApiResponse<Post[]>} */
    const response = await get(`/api/events/${event_id}/posts`)
    if (!response.success) {
        // TODO: print error in a toast like thing
        return []
    }
    return response.data
}


/**
 * @param {String} content
 * @param {String} event_id
 * @return {Post|null}
 */
export async function create_new({content, event_id}) {
    const response = await post(
        `/api/events/${event_id}/posts`,
        { content }
    )
    if (!response.success) {
        // TODO: print error in a toast like thing
        return null
    }
    return response.data
}
