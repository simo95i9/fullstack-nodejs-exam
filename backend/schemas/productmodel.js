import mongoose from 'mongoose'
const Types = {...mongoose.Schema.Types}

import { ProductCollection } from './productcollection.js'

export const ProductModel = new mongoose.Schema({
    productCollection: { type: Types.ObjectId, ref: 'ProductCollection' },

    name: Types.String,
    sku: Types.String,
    description: Types.String,

    traits: [{name: Types.String}],
    tags: [{name: Types.String}],

    created: { type: Types.Date, default: Date.now },
    modified: { type: Types.Date, default: null },
    deleted: { type: Types.Date, default: null },
})