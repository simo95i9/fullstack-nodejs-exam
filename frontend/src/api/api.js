const api_server = ''

export async function get(path) {
    const response = await fetch(`${api_server}${path}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    }).catch(reason => {
        console.error('fetch() failed, probably network error')
        console.error(reason)
        return new Response(JSON.stringify({ success: false, data: null }))
    })

    const result = await response.json().catch(reason => {
        console.error('Response::json failed, probably bad json')
        console.error(reason)
        return { success: false, data: null }
    })

    return result
}

export async function post(path, payload) {
    const response = await fetch(`${api_server}${path}`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).catch(reason => {
        console.error('fetch() failed, probably network error')
        console.error(reason)
        return new Response(JSON.stringify({ success: false, data: null }))
    })

    const result = await response.json().catch(reason => {
        console.error('Response::json failed, probably bad json')
        console.error(reason)
        return { success: false, data: null }
    })

    return result
}