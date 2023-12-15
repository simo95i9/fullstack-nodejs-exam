import express from 'express'
const app = express()

import session from 'express-session'
import { session_options } from 'backend/config.js'
app.use(session(session_options))

import { router as auth } from 'backend/routes/auth.js'
app.use('/api/auth/', auth)

import { router as events } from 'backend/routes/events.js'
app.use('/api/auth/', auth)

import { Logger } from 'shared/utils.js'
const logger = new Logger('backend/index')

import { port, hostname } from 'backend/config.js'
const server = app.listen(port, hostname, () => {
    const address = server.address()
    logger.info(`Web Server is listening on http://${address.address}:${address.port}/`)
})
