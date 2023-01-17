import { Router } from 'express'
export const router = Router()


import { connection } from "../datastore.js"
const ProductCollection = connection.models['ProductCollection']


// Return all collections
router.get('/', async (req, res) => {
    const collections = await ProductCollection.find({})
    console.log('all collections: ', collections)
    res.send(collections)
})

// Return collection by id
router.get('/:id', async (req, res) => {
    const collection = await ProductCollection.findOne({ _id: req.params.id })
    console.log('found collection by id: ', collection)
    res.send(collection)
})

// Remove collection by id
router.delete('/:id/', async (req, res) => {
    const result = await ProductCollection.deleteOne({ _id: req.params.id })
    res.send(result)
})
