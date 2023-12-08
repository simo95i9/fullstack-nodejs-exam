/**
 * Tag function to be used on template literals, for un-indenting them
 * This lets you have a little more freedom to format your string in the source code
 */
export function undent() {
    // Assemble the template literal
    let result = ''
    for (let i = 0; i < arguments[0].length; i++) {
        result += arguments[0][i]
        result += arguments[i + 1] ?? ''
    }

    const lines = result.split('\n')

    // Find the smallest 'common indentation', disregarding all-whitespace lines
    const minimum_indentation = lines
        .filter((line) => line.trim().length > 0)
        .map((line) => line.length - line.trimStart().length)
        .reduce((prev, curr) => (prev <= curr ? prev : curr), Number.POSITIVE_INFINITY)

    // Trim the indentation from each line
    const unindented_lines = lines.map((line) => line.substring(minimum_indentation))

    // Finally assembling the string and trimming empty lines at start and end
    return unindented_lines.join('\n').trim()
}

/**
 * @typedef {Object} EnumProperty
 * @property {Number} value
 * @property {String} name
 */

/**
 * @readonly
 * @enum {EnumProperty}
 */
const LogLevel = {
    TRACE: { value: 0, name: 'TRACE' },
    DEBUG: { value: 1, name: 'DEBUG' },
    INFO: { value: 2, name: 'INFO' },
    WARN: { value: 3, name: 'WARN' },
    ERROR: { value: 4, name: 'ERROR' }
}

export class Logger {
    constructor(module_name) {
        this.module_name = module_name
    }

    /**
     * @param {LogLevel} log_level
     * @param {any} message
     */
    log(log_level, ...message) {
        console.group(`[ ${log_level.name} ] --- [ ${this.module_name} ]`)
        console.log(...(message.map(value => undent(String(value)))))
        console.groupEnd()
    }

    /**
     * @param {any} message
     */
    trace(...message) {
        this.log(LogLevel.TRACE, message)
    }

    /**
     * @param {any} message
     */
    debug(...message) {
        this.log(LogLevel.DEBUG, message)
    }

    /**
     * @param {any} message
     */
    info(...message) {
        this.log(LogLevel.INFO, message)
    }

    /**
     * @param {any} message
     */
    warn(...message) {
        this.log(LogLevel.WARN, message)
    }

    /**
     * @param {any} message
     */
    error(...message) {
        this.log(LogLevel.ERROR, message)
    }
}

/**
 * @readonly
 * @enum
 * @description The status codes listed below are defined by RFC 9110 (minus deprecated and WebDAV related stuff)
 * @see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
export const http_status_codes = {
    /**
     * Informational responses (100 – 199)
     * @enum {number}
     */
    informational: {
        /**
         * This interim response indicates that the client should continue the request or ignore the response
         * if the request is already finished.
         */
        continue: 100,

        /**
         * This code is sent in response to an Upgrade request header from the client and indicates the protocol
         * the server is switching to.
         */
        switching_protocols: 101,

        /**
         * This status code is primarily intended to be used with the Link header, letting the user agent start
         * preloading resources while the server prepares a response or preconnect to an origin from which the
         * page will need resources.
         */
        early_hints: 103
    },

    /**
     * Successful responses (200 – 299)
     */
    success: {
        /**
         * The request succeeded. The result meaning of "success" depends on the HTTP method:
         * GET: The resource has been fetched and transmitted in the message body.
         * HEAD: The representation headers are included in the response without any message body.
         * PUT or POST: The resource describing the result of the action is transmitted in the message body.
         * TRACE: The message body contains the request message as received by the server.
         */
        ok: 200,

        /**
         * The request succeeded, and a new resource was created as a result. This is typically the response sent
         * after POST requests, or some PUT requests.
         */
        created: 201,

        /**
         * The request has been received but not yet acted upon. It is noncommittal, since there is no way in HTTP
         * to later send an asynchronous response indicating the outcome of the request. It is intended for cases
         * where another process or server handles the request, or for batch processing.
         */
        accepted: 202,

        /**
         * This response code means the returned metadata is not exactly the same as is available from the origin
         * server, but is collected from a local or a third-party copy. This is mostly used for mirrors or backups of
         * another resource. Except for that specific case, the 200 OK response is preferred to this status.
         */
        non_authoritative_information: 203,

        /**
         * There is no content to send for this request, but the headers may be useful. The user agent may update its
         * cached headers for this resource with the new ones.
         */
        no_content: 204,

        /**
         * Tells the user agent to reset the document which sent this request.
         */
        reset_content: 205,

        /**
         * This response code is used when the Range header is sent from the client to request only part of a
         * resource.
         */
        partial_content: 206,

        /**
         * The server has fulfilled a GET request for the resource, and the response is a representation of the
         * result of one or more instance-manipulations applied to the current instance.
         */
        im_used: 226
    },

    /**
     * Redirection messages (300 – 399)
     */
    redirection: {
        /**
         * The request has more than one possible response. The user agent or user should choose one of them.
         * (There is no standardized way of choosing one of the responses, but HTML links to the possibilities
         * are recommended so the user can pick.)
         */
        multiple_choices: 300,

        /**
         * The URL of the requested resource has been changed permanently. The new URL is given in the response.
         */
        moved_permanently: 301,

        /**
         * This response code means that the URI of requested resource has been changed temporarily. Further
         * changes in the URI might be made in the future. Therefore, this same URI should be used by the client
         * in future requests.
         */
        found: 302,

        /**
         * The server sent this response to direct the client to get the requested resource at another URI with
         * a GET request.
         */
        see_other: 303,

        /**
         * This is used for caching purposes. It tells the client that the response has not been modified, so the
         * client can continue to use the same cached version of the response.
         */
        not_modified: 304,

        /**
         * The server sends this response to direct the client to get the requested resource at another URI with the
         * same method that was used in the prior request. This has the same semantics as the 302 Found HTTP response
         * code, with the exception that the user agent must not change the HTTP method used: if a POST was used in the
         * first request, a POST must be used in the second request.
         */
        temporary_redirect: 307,

        /**
         * This means that the resource is now permanently located at another URI, specified by
         * the Location: HTTP Response header. This has the same semantics as the 301 Moved Permanently HTTP response
         * code, with the exception that the user agent must not change the HTTP method used: if a POST was used
         * in the first request, a POST must be used in the second request.
         */
        permanent_redirect: 308
    },

    /**
     * Client error responses (400 – 499)
     */
    client_error: {
        /**
         * The server cannot or will not process the request due to something that is perceived to be a client error
         * (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
         */
        bad_request: 400,

        /**
         * Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated".
         * That is, the client must authenticate itself to get the requested response.
         */
        unauthorized: 401,

        /**
         * This response code is reserved for future use. The initial aim for creating this code was using it for
         * digital payment systems, however this status code is used very rarely and no standard convention exists.
         */
        payment_required: 402,

        /**
         * The client does not have access rights to the content; that is, it is unauthorized, so the server is
         * refusing to give the requested resource. Unlike 401 Unauthorized, the client's identity is known to the
         * server.
         */
        forbidden: 403,

        /**
         * The server cannot find the requested resource. In the browser, this means the URL is not recognized. In a
         * API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of 403 Forbidden to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.
         */
        not_found: 404,

        /**
         * The request method is known by the server but is not supported by the target resource. For example, an API
         * may not allow calling DELETE to remove a resource.
         */
        method_not_allowed: 405,

        /**
         * This response is sent when the web server, after performing server-driven content negotiation, doesn't
         * find any content that conforms to the criteria given by the user agent.
         */
        not_acceptable: 406,

        /**
         * This is similar to 401 Unauthorized but authentication is needed to be done by a proxy.
         */
        proxy_authentication_required: 407,

        /**
         * This response is sent on an idle connection by some servers, even without any previous request by the
         * client. It means that the server would like to shut down this unused connection. This response is used
         * much more since some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection mechanisms to
         * speed up surfing. Also note that some servers merely shut down the connection without sending this message.
         */
        request_timeout: 408,

        /**
         * This response is sent when a request conflicts with the current state of the server.
         */
        conflict: 409,

        /**
         * This response is sent when the requested content has been permanently deleted from server, with no
         * forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP
         * specification intends this status code to be used for "limited-time, promotional services". APIs should not
         * feel compelled to indicate resources that have been deleted with this status code.
         */
        gone: 410,

        /**
         * Server rejected the request because the Content-Length header field is not defined and the server requires
         * it.
         */
        length_required: 411,

        /**
         * The client has indicated preconditions in its headers which the server does not meet.
         */
        precondition_failed: 412,

        /**
         * Request entity is larger than limits defined by server. The server might close the connection or return
         * an Retry-After header field.
         */
        payload_too_large: 413,

        /**
         * The URI requested by the client is longer than the server is willing to interpret.
         */
        uri_too_long: 414,

        /**
         * The media format of the requested data is not supported by the server, so the server is rejecting the
         * request.
         */
        unsupported_media_type: 415,

        /**
         * The range specified by the Range header field in the request cannot be fulfilled. It's possible that the
         * range is outside the size of the target URI's data.
         */
        range_not_satisfiable: 416,

        /**
         * This response code means the expectation indicated by the Expect request header field cannot be met by
         * the server.
         */
        expectation_failed: 417,

        /**
         * The server refuses the attempt to brew coffee with a teapot.
         */
        im_a_teapot: 418,

        /**
         * The request was directed at a server that is not able to produce a response. This can be sent by a server
         * that is not configured to produce responses for the combination of scheme and authority that are included
         * in the request URI.
         */
        misdirected_request: 421,

        /**
         * Indicates that the server is unwilling to risk processing a request that might be replayed.
         */
        too_early_experimental: 425,

        /**
         * The server refuses to perform the request using the current protocol but might be willing to do so after
         * the client upgrades to a different protocol. The server sends an Upgrade header in a 426 response to
         * indicate the required protocol(s).
         */
        upgrade_required: 426,

        /**
         * The origin server requires the request to be conditional. This response is intended to prevent the
         * 'lost update' problem, where a client GETs a resource's state, modifies it and PUTs it back to the server,
         * when meanwhile a third party has modified the state on the server, leading to a conflict.
         */
        precondition_required: 428,

        /**
         * The user has sent too many requests in a given amount of time ("rate limiting").
         */
        too_many_requests: 429,

        /**
         * The server is unwilling to process the request because its header fields are too large. The request may
         * be resubmitted after reducing the size of the request header fields.
         */
        request_header_fields_too_large: 431,

        /**
         * The user agent requested a resource that cannot legally be provided, such as a web page censored by
         * a government.
         */
        unavailable_for_legal_reasons: 451
    },

    /**
     * Server error responses (500 – 599)
     */
    server_error: {
        /**
         * The server has encountered a situation it does not know how to handle.
         */
        internal_server_error: 500,

        /**
         * The request method is not supported by the server and cannot be handled. The only methods that servers
         * are required to support (and therefore that must not return this code) are GET and HEAD.
         */
        not_implemented: 501,

        /**
         * This error response means that the server, while working as a gateway to get a response needed to handle
         * the request, got an invalid response.
         */
        bad_gateway: 502,

        /**
         * The server is not ready to handle the request. Common causes are a server that is down for maintenance or
         * that is overloaded. Note that together with this response, a user-friendly page explaining the problem
         * should be sent. This response should be used for temporary conditions and the Retry-After HTTP header
         * should, if possible, contain the estimated time before the recovery of the service. The webmaster must
         * also take care about the caching-related headers that are sent along with this response, as these temporary
         * condition responses should usually not be cached.
         */
        service_unavailable: 503,

        /**
         * This error response is given when the server is acting as a gateway and cannot get a response in time.
         */
        gateway_timeout: 504,

        /**
         * The HTTP version used in the request is not supported by the server.
         */
        http_version_not_supported: 505,

        /**
         * The server has an internal configuration error: the chosen variant resource is configured to engage in
         * transparent content negotiation itself, and is therefore not a proper end point in the negotiation process.
         */
        variant_also_negotiates: 506,

        /**
         * Further extensions to the request are required for the server to fulfill it.
         */
        not_extended: 510,

        /**
         * Indicates that the client needs to authenticate to gain network access.
         */
        network_authentication_required: 511
    }
}


/**
 * HTTP request methods
 * @description HTTP defines a set of request methods to indicate the desired action to be performed for a given resource.
 * Although they can also be nouns, these request methods are sometimes referred to as HTTP verbs. Each of them
 * implements a different semantic, but some common features are shared by a group of them: e.g. a request method
 * can be safe, idempotent, or cacheable.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 */
export const http_request_methods = {
    // GET: The GET method requests a representation of the specified resource. Requests using GET should only retrieve data.
    get: 'GET',
    // HEAD: The HEAD method asks for a response identical to a GET request, but without the response body.
    head: 'HEAD',
    // POST: The POST method submits an entity to the specified resource, often causing a change in state or side effects on the server.
    post: 'POST',
    // PUT: The PUT method replaces all current representations of the target resource with the request payload.
    put: 'PUT',
    // DELETE: The DELETE method deletes the specified resource.
    delete: 'DELETE',
    // CONNECT: The CONNECT method establishes a tunnel to the server identified by the target resource.
    connect: 'CONNECT',
    // OPTIONS: The OPTIONS method describes the communication options for the target resource.
    options: 'OPTIONS',
    // TRACE: The TRACE method performs a message loop-back test along the path to the target resource.
    trace: 'TRACE',
    // PATCH: The PATCH method applies partial modifications to a resource.
    patch: 'PATCH'


}

