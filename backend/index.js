import {Logger } from 'shared/utils.js'
const logger = new Logger('main')

import express from 'express'
const app = express()

import session from 'express-session'
import { session_options } from 'backend/config.js'
app.use(session(session_options))

import { router as auth } from 'backend/routes/auth.js'
app.use('/api/auth/', auth)

app.get('/', (req, res) => {
    res.send('hello world')
})

import { port, hostname } from 'backend/config.js'
const server = app.listen(port, hostname)
logger.info(`Web Server is listening on http://${hostname}:${port}/`)
