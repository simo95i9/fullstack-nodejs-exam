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

app.get('/*', (req, res) => {
    res.send('hello, world!')
})

app.listen(3000, () => { console.log('express is listening on port', 3000) })
