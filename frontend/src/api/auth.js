import { readonly, writable } from 'svelte/store'
import { get, post } from 'frontend/src/api/api.js'
import { fileToBase64DataUrl } from 'shared/utils.js'

/** @type {Writable<Account|null>} */
const _account = writable(null)
export const account = readonly(_account)

/**
 * @return {Promise<void>}
 */
export async function status() {
    /** @type {ApiResponse.<Account>} */
    const response = await get('/api/auth')
    if (response.success) {
        _account.set(response.data)
    }
}

/**
 * @param {String} full_name
 * @param {String} display_name
 * @param {String} email
 * @param {String} password
 * @param {FileList|File[]} avatar
 * @return {Promise<void>}
 * */
export async function signup({ full_name, display_name, email, password, avatar }) {
    if (!avatar) {
        const response = await fetch('/assets/default_avatar.png')
        const buffer = await response.arrayBuffer()
        avatar = [new File([buffer], 'default_avatar.png', { type: 'image/png' })]
    }
    const picture = await fileToBase64DataUrl(avatar[0])
    /** @type {ApiResponse.<Account>} */
    const response = await post('/api/auth/signup', { full_name, display_name, email, password, picture })
    if (response.success) {
        _account.set(response.data)
    }
}

/**
 * @param email
 * @param password
 * @return {Promise<void>}
 */
export async function signin({ email, password }) {
    /** @type {ApiResponse.<Account>} */
    const response = await post('/api/auth/signin', { email, password })
    if (response.success) {
        _account.set(response.data)
    }
}

export async function signout() {
    /** @type {ApiResponse.<null>} */
    const response = await post('/api/auth/signout', {})
    if (response.success) {
        _account.set(null)
    }
}
