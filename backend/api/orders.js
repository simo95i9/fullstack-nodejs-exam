import { Router } from 'express'
export const router = Router()

import { connection } from "../datastore.js"
const Order = connection.models['Order']

// Return all orders
// Should be secured
router.get('/', async (req, res) => {
    const orders = await Order.find({})
    console.log('all orders: ', orders)
    res.send(orders)
})

// Return order by id
// should be secured
router.get('/:id/', async (req, res) => {
    const order = await Order.findOne({ _id: req.params.id })
    console.log('found order by id: ', order)
    res.send(order)
})

// Remove account by email
// should be secured
router.delete('/:id/', async (req, res) => {
    const result = await Account.deleteOne({ _id: req.params.id })
    res.send(result)
})
