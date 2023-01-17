import mongoose from 'mongoose'

mongoose.set('strictQuery', false);
export const connection = await mongoose.connect('mongodb://127.0.0.1:27017/test')

import { Order } from './schemas/order.js'
connection.model('Order', Order)

import { Account } from './schemas/account.js'
connection.model('Account', Account)

import { Product } from './schemas/product.js'
connection.model('Product', Product)

import { ProductModel } from './schemas/productmodel.js'
connection.model('ProductModel', ProductModel)

import { ProductCollection } from './schemas/productcollection.js'
connection.model('ProductCollection', ProductCollection)

import { ProductCategory } from './schemas/productcategory.js'
connection.model('ProductCategory', ProductCategory)

import { Department } from './schemas/department.js'
connection.model('Department', Department)
