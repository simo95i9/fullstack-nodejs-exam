import { writable, readonly } from 'svelte/store'

/** @type {Writable<import('backend/models/account.js').Account|null>} */
const _account = writable(null)
export const account = readonly(_account)


import { get, post } from 'frontend/src/api/api.js'
export async function status() {
    const response = await get('/api/auth')
    if (response.success) {
        _account.set(response.data)
    }
}

export async function signup({ full_name, display_name, email, password }) {
    const response = await post('/api/auth/signup', { full_name, display_name, email, password, })
    if (response.success) {
        _account.set(response.data)
    }
}

export async function signin({ email, password }) {
    const response = await post('/api/auth/signin', { email, password })
    if (response.success) {
        _account.set(response.data)
    }
}

export async function signout() {
    const response = await post('/api/auth/signout', {})
    if (response.success) {
        _account.set(null)
    }
}
