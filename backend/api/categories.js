import { Router } from 'express'
export const router = Router()


import { connection } from "../datastore.js"
const ProductCategory = connection.models['ProductCategory']


// Return all categories
router.get('/', async (req, res) => {
    const categories = await ProductCategory.find({})
    console.log('all categories: ', categories)
    res.send(categories)
})

// Return categories by id
router.get('/:id', async (req, res) => {
    const category = await ProductCategory.findOne({ _id: req.params.id })
    console.log('found category by id: ', category)
    res.send(category)
})

// Remove category by id
router.delete('/:id/', async (req, res) => {
    const result = await ProductCategory.deleteOne({ _id: req.params.id })
    res.send(result)
})
