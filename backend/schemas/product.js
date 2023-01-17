import mongoose from 'mongoose'
const Types = {...mongoose.Schema.Types}

import { ProductModel } from './productmodel.js'

export const Product = new mongoose.Schema({
    productModel: { type: Types.ObjectId, ref: 'ProductModel' },

    description: Types.String,
    price: Types.Number,
    sku: Types.String,
    inventory: Types.Number,
    traits: Types.Mixed,

    created: { type: Types.Date, default: Date.now },
    modified: { type: Types.Date, default: null },
    deleted: { type: Types.Date, default: null },
})