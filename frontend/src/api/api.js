import { Temporal } from 'temporal-polyfill'

const api_server = ''

/**
 * @param {String} path
 * @return {Promise<ApiResponse>}
 */
export async function get(path) {
    const response = await fetch(`${api_server}${path}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
        },
    }).catch((reason) => {
        return new Response(JSON.stringify({ success: false, error: reason }))
    })

    return revive(response)
}

/**
 * @param {String} path
 * @param {Object} payload
 * @return {Promise<ApiResponse>}
 */
export async function post(path, payload) {
    const response = await fetch(`${api_server}${path}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).catch((reason) => {
        return new Response(JSON.stringify({ success: false, error: reason }))
    })

    return revive(response)
}

/**
 * @param {String} path
 * @param {Object} payload
 * @return {Promise<ApiResponse>}
 */
// 'delete' is a reserved keyword -.-
export async function delet(path) {
    const response = await fetch(`${api_server}${path}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    }).catch((reason) => {
        return new Response(JSON.stringify({ success: false, error: reason }))
    })

    return revive(response)
}

/**
 * @param {Response} response
 */
async function revive(response) {
    const text = await response.text()
    let result = null
    try {
        result = JSON.parse(text, (key, value) => {
            if (key.startsWith('datetime_') && value) {
                return Temporal.PlainDateTime.from(value) ?? value
            }
            if (key.startsWith('zoned_datetime_') && value) {
                return Temporal.ZonedDateTime.from(value) ?? value
            }
            return value
        })
    } catch (reason) {
        return { success: false, error: reason }
    }
    return result
}

/**
 * @typedef {Object.<T>} SuccessResponse
 * @template T
 * @property {true} success
 * @property {T} data
 */

/**
 * @typedef {Object} ErrorResponse
 * @property {false} success
 * @property {String} error
 */

/**
 * @typedef {SuccessResponse.<T> | ErrorResponse} ApiResponse
 * @template T
 */
