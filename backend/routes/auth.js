import * as account_service from 'backend/services/account.js'

import { Router, json } from 'express'
export const router = new Router()
router.use(json())

router.get('/', (request, response) => {
    account_service.get_current_session(request, response)
})

router.post('/signin', async (request, response) => {
    await account_service.authenticate_session(request, response)
})

router.post('/signout', (request, response) => {
    account_service.deauthenticate_session(request, response)
})

router.post('/signup', async (request, response) => {
    await account_service.create_new_account(request, response)
})
