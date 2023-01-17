import { Router, json} from 'express'
export const router = new Router()
router.use(json())


import { auth } from './auth.js'


import { connection } from "./datastore.js"
const Department = connection.models['Department']
const ProductCategory = connection.models['ProductCategory']
const ProductCollection = connection.models['ProductCollection']
const ProductModel = connection.models['ProductModel']
const Product = connection.models['Product']
const Account = connection.models['Account']
const Order = connection.models['Order']


import { router as departments } from './api/departments.js'
router.use('/departments', departments)

import { router as categories } from './api/categories.js'
router.use('/categories', categories)

import { router as collections } from './api/collections.js'
router.use('/collections', collections)

import { router as models } from './api/models.js'
router.use('/models', models)

import { router as products } from './api/products.js'
router.use('/products', products)

import { router as accounts } from './api/accounts.js'
router.use('/accounts', accounts)

import { router as orders } from './api/orders.js'
router.use('/orders', orders)



// Return all orders in account
router.get('/accounts/:account_email/orders', auth('account_email'), async (req, res) => {
    const account = await Account.findOne({ email: req.params.account_email })
    const orders = await Order.find({  account: { _id: account._id } })

    console.log('found orders: ', orders)
    res.send(orders)
})
router.get('/accounts/:account_email/orders', async (req, res) => {
    res.status(401).send()
})


// Return department by short-name
router.get('/:department_name/', async (req, res) => {
    const department = await Department.findOne({ shortName: req.params.department_name })
    console.log('found department: ', department)
    res.send(department)
})

// Return categories in department
router.get('/:department_name/categories', async (req, res) => {
    const department = await Department.findOne({ shortName: req.params.department_name })
    const categories = await ProductCategory.find({ department: { _id: department._id } })

    console.log('found categories: ', categories)
    res.send(categories)
})

// Return category by short-name
router.get('/:department_name/:category_name', async (req, res) => {
    const department = await Department.findOne({ shortName: req.params.department_name })
    const category = await ProductCategory.findOne({
        shortName: req.params.category_name,
        department: { _id: department._id }
    })
    const result = await category.populate('department')

    console.log('found category: ', result)
    res.send(result)
})

// Return collections in category
router.get('/:department_name/:category_name/collections', async (req, res) => {
    const department = await Department.findOne({ shortName: req.params.department_name })
    const category = await ProductCategory.findOne({
        shortName: req.params.category_name,
        department: { _id: department._id }
    })
    const collections = await ProductCollection.find({ productCategory: { _id: category._id } })
    console.log('found collections: ', collections)
    res.send(collections)
})

// Return collection by short-name
router.get('/:department_name/:category_name/:collection_name', async (req, res) => {
    const department = await Department.findOne({ shortName: req.params.department_name })
    const category = await ProductCategory.findOne({
        shortName: req.params.category_name,
        department: { _id: department._id }
    })
    const collection = await ProductCollection.findOne({
        shortName: req.params.collection_name,
        productCategory: { _id: category._id }
    })
    const result = await collection.populate('productCategory')

    console.log('found collection: ', result)
    res.send(result)
})

// Return models in collection
router.get('/:department_name/:category_name/:collection_name/models', async (req, res) => {
    const department = await Department.findOne({ shortName: req.params.department_name })
    const category = await ProductCategory.findOne({
        shortName: req.params.category_name,
        department: { _id: department._id }
    })
    const collection = await ProductCollection.findOne({
        shortName: req.params.collection_name,
        productCategory: { _id: category._id }
    })
    const models = await ProductModel.find({ productCollection: { _id: collection._id } })
    console.log('found models: ', models)
    res.send(models)
})

// Return model by sku
router.get('/:department_name/:category_name/:collection_name/:model_sku', async (req, res) => {
    const department = await Department.findOne({ shortName: req.params.department_name })
    const category = await ProductCategory.findOne({
        shortName: req.params.category_name,
        department: { _id: department._id }
    })
    const collection = await ProductCollection.findOne({
        shortName: req.params.collection_name,
        productCategory: { _id: category._id }
    })
    const model = await ProductModel.findOne({
        sku: req.params.model_sku,
        productCollection: { _id: collection._id }
    })
    const result = await model.populate('productCollection')

    console.log('found model: ', result)
    res.send(result)
})

// Return products in model
router.get('/:department_name/:category_name/:collection_name/:model_sku/products', async (req, res) => {
    const department = await Department.findOne({ shortName: req.params.department_name })
    const category = await ProductCategory.findOne({
        shortName: req.params.category_name,
        department: { _id: department._id }
    })
    const collection = await ProductCollection.findOne({
        shortName: req.params.collection_name,
        productCategory: { _id: category._id }
    })
    const model = await ProductModel.findOne({
        sku: req.params.model_sku,
        productCollection: { _id: collection._id }
    })
    const products = await Product.find({ productModel: { _id: model._id } })
    console.log('found products: ', products)
    res.send(products)
})

// Return product by sku
router.get('/:department_name/:category_name/:collection_name/:model_sku/:product_sku', async (req, res) => {
    const department = await Department.findOne({ shortName: req.params.department_name })
    const category = await ProductCategory.findOne({
        shortName: req.params.category_name,
        department: { _id: department._id }
    })
    const collection = await ProductCollection.findOne({
        shortName: req.params.collection_name,
        productCategory: { _id: category._id }
    })
    const model = await ProductModel.findOne({
        sku: req.params.model_sku,
        productCollection: { _id: collection._id }
    })
    const product = await Product.findOne({
        sku: req.params.product_sku,
        productModel: { _id: model._id }
    })
    const result = await product.populate('productModel')

    console.log('found product: ', result)
    res.send(result)
})


// Create new department
router.post('/departments', async (req, res) => {
    const department = await Department.create(req.body)
    console.log('post body: ', req.body)
    console.log('created department: ', department)
    res.send(department)
})

// Create new category in department
router.post('/:department_name/categories', async (req, res) => {
    const department = await Department.findOne({ shortName: req.params.department_name })
    const category = await ProductCategory.create({ ...req.body, department })

    console.log('post body: ', req.body)
    console.log('created category: ', category)
    res.send(category)
})

// Create new collection in category
router.post('/:department_name/:category_name/collections', async (req, res) => {
    const department = await Department.findOne({ shortName: req.params.department_name })
    const category = await ProductCategory.findOne({
        shortName: req.params.category_name,
        department: { _id: department._id }
    })
    const collection = await ProductCollection.create({ ...req.body, productCategory: category })

    console.log('post body: ', req.body)
    console.log('created collection: ', collection)
    res.send(collection)
})

// Create new model in collection
router.post('/:department_name/:category_name/:collection_name/models', async (req, res) => {
    const department = await Department.findOne({ shortName: req.params.department_name })
    const category = await ProductCategory.findOne({
        shortName: req.params.category_name,
        department: { _id: department._id }
    })
    const collection = await ProductCollection.findOne({
        shortName: req.params.collection_name,
        productCategory: { _id: category._id }
    })
    const model = await ProductModel.create({ ...req.body, productCollection: collection })

    console.log('post body: ', req.body)
    console.log('created model: ', model)
    res.send(model)
})

// Create new product in model
router.post('/:department_name/:category_name/:collection_name/:model_sku/products', async (req, res) => {
    const department = await Department.findOne({ shortName: req.params.department_name })
    const category = await ProductCategory.findOne({
        shortName: req.params.category_name,
        department: { _id: department._id }
    })
    const collection = await ProductCollection.findOne({
        shortName: req.params.collection_name,
        productCategory: { _id: category._id }
    })
    const model = await ProductModel.findOne({
        sku: req.params.model_sku,
        productCollection: { _id: collection._id }
    })
    const product = await Product.create({ ...req.body, productModel: model })

    console.log('post body: ', req.body)
    console.log('created product: ', product)
    res.send(product)
})
