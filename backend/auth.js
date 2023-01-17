import { Router, json } from 'express'
export const router = Router()
router.use(json())


import { connection } from './datastore.js'
const Account = await connection.models['Account']


import * as argon2 from 'argon2'
const defaultOptions = {
    hashLength: 32,
    timeCost: 3,
    memoryCost:65536,
    parallelism: 4,
    type: 2, // argon2.argon2id doesn't work for "reasons",
    saltLength: 16
}
async function hash(password) {
    return await argon2.hash(password, defaultOptions)
}
async function verify(hash, plain) {
    return await argon2.verify(hash, plain)
}


export function admin(req, res, next) {
    if (req.session.account?.admin)
        next()

    next('route')
}

export function auth(emailKey) {
    return (req, res, next) => {
        if (!req.session.account) {
            next('route')
            return
        }

        if (req.session.account.admin) {
            next()
            return
        }

        if (req.session.account.email === req.params[emailKey]) {
            next()
            return
        }

        next('route')
    }
}


router.post('/signin', async (req, res) => {
    const account = await Account.findOne({ email: req.body.email })
    const goodPassword = await verify(account.password, req.body.password)

    req.session.account = goodPassword ? account : null
    res.send({ status: goodPassword ? 'success' : 'failure', account: goodPassword ? account : null })
})

router.post('/signout', async (req, res) => {
    req.session.account = null
    res.send({ status: 'success' })
})

router.post('/signup', async (req, res) => {
    const hashed = await hash(req.body.password)
    const account = await Account.create({...req.body, password: hashed, admin: false})
    console.log('created account: ', account)
    res.send({ status: 'success', account: account })
})