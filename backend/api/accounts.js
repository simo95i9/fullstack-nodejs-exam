import { Router } from 'express'
export const router = Router()

import { connection } from "../datastore.js"
const Account = connection.models['Account']

// Return all accounts
// Should be secured
router.get('/', async (req, res) => {
    const accounts = await Account.find({})
    console.log('all accounts: ', accounts)
    res.send(accounts)
})

// Return account by email
// should be secured
router.get('/:account_email/', async (req, res) => {
    const account = await Account.findOne({ email: req.params.account_email })
    console.log('found account by email: ', account)
    res.send(account)
})

// Remove account by email
// should be secured
router.delete('/:id/', async (req, res) => {
    const result = await Account.deleteOne({ _id: req.params.id })
    res.send(result)
})
