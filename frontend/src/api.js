import { authentication } from './stores.js'

export const accounts = {

    async status({ }) {
        const response = await get('/api/auth')
        // TODO: validate fields and throw/handle errors
        authentication.set(response.success ? response.data : null)
    },

    async signin({ email, password }) {
        const response = await post('/api/auth/signin', { email, password })
        // TODO: validate fields and throw/handle errors
        authentication.set(response.success ? response.data : null)
        return response
    },

    async signout({ }) {
        const response = await post('/api/auth/signout', { })
        // TODO: validate fields and throw/handle errors
        authentication.set(null)
        return response
    },

    async signup({ full_name, display_name, email, password }) {
        const response = await post('/api/auth/signup',{ full_name, display_name, email, password })
        // TODO: validate fields and throw/handle errors
        authentication.set(response.success ? response.data : null)
        return response
    },
}


import { Logger, http_request_methods } from 'shared/utils.js'
const logger = new Logger('frontend::api')

async function get(url) {
    const result = await fetch(url, {
        method: http_request_methods.get,
        headers: {
            'Accept': 'application/json',
        },
    }).catch(reason => {
        logger.debug('get() failed', reason)
        return { success: false, data: null }
    })

    return await result.json()
}

async function post(url, payload) {
    const result = await fetch(url, {
        method: http_request_methods.post,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).catch(reason => {
        logger.debug('get() failed', reason)
        return { success: false, data: null }
    })

    return await result.json()
}
