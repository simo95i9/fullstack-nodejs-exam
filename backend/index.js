import express from 'express'
const app = express()


import session from 'express-session'
import { session_options } from 'backend/config.js'
app.use(session(session_options))


import { router as auth } from 'backend/routes/auth.js'
app.use('/api/auth', auth)

import { router as accounts } from 'backend/routes/accounts.js'
app.use('/api/accounts', accounts)

import { router as events } from 'backend/routes/events.js'
app.use('/api/events', events)

import { router as tags } from 'backend/routes/tags.js'
app.use('/api/tags', tags)


import { Logger } from 'shared/utils.js'
const logger = new Logger('backend/index')


import { port, host } from 'backend/config.js'
const server = app.listen({ host, port }, () => {
    const address = server.address()
    logger.info(
        address.family === 'IPv6' ?
        `Web Server is listening on http://[${address.address}]:${address.port}/` :
        `Web Server is listening on http://${address.address}:${address.port}/`
    )
})
