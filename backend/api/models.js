import { Router } from 'express'
export const router = Router()


import { connection } from "../datastore.js"
const ProductModel = connection.models['ProductModel']


// Return all models
router.get('/', async (req, res) => {
    const models = await ProductModel.find({})
    console.log('all models: ', models)
    res.send(models)
})

// Return model by id
router.get('/:id', async (req, res) => {
    const model = await ProductModel.findOne({ _id: req.params.id })
    console.log('found model by id: ', model)
    res.send(model)
})

// Remove model by id
router.delete('/:model_id/', async (req, res) => {
    const result = await ProductModel.deleteOne({ _id: req.params.id })
    res.send(result)
})