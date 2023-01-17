import { Router } from 'express'
export const router = Router()


import { connection } from "../datastore.js"
const Product = connection.models['Product']


// Return all products
router.get('/', async (req, res) => {
    const products = await Product.find({})
    console.log('all products: ', products)
    res.send(products)
})

// Return product by id
router.get('/:id', async (req, res) => {
    const models = await Product.findOne({ _id: req.params.id })
    console.log('found product by id: ', product)
    res.send(models)
})

// Remove product by id
router.delete('/:id/', async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result)
})