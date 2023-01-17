import express from 'express'
const app = express()

import session from 'express-session'
const sessionOptions = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}
app.set('trust proxy', 1)
app.use(session(sessionOptions))


import { router as api } from './api.js'
app.use('/api/', api)

import { router as auth } from './auth.js'
app.use('/auth/', auth)


app.get('/', (req, res) => {
    res.send('hello, world!')
})

app.listen(3000, () => { console.log('express is listening on port', 3000) })
