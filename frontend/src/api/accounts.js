import { get } from 'frontend/src/api/api.js'

/**
 * @param {String} id
 * @return {Promise<Account|null>}
 */
export async function get_by_id({ id }) {
    /** @type {ApiResponse.<Account>} */
    const response = await get(`/api/accounts/${id}`)
    if (!response.success) {
        // TODO: report error in toast like thing
        return null
    }
    return response.data
}

/**
 * @return {Promise<Account[]>}
 */
export async function get_all() {
    /** @type {ApiResponse.<Account[]>} */
    const response = await get(`/api/accounts/`)
    if (!response.success) {
        // TODO: report error in toast like thing
        return []
    }
    return response.data
}
