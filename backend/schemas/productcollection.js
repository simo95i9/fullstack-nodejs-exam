import mongoose from 'mongoose'
const Types = {...mongoose.Schema.Types}

import { ProductCategory } from './productcategory.js'

export const ProductCollection = new mongoose.Schema({
    productCategory: { type: Types.ObjectId, ref: 'ProductCategory' },

    name: Types.String,
    shortName: Types.String,
    description: Types.String,

    created: { type: Types.Date, default: Date.now },
    modified: { type: Types.Date, default: null },
    deleted: { type: Types.Date, default: null },
})