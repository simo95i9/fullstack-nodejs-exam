import mongoose from 'mongoose'
const Types = {...mongoose.Schema.Types}

import { Department } from './department.js'

export const ProductCategory = new mongoose.Schema({
    department: { type: Types.ObjectId, ref: 'Department' },

    name: Types.String,
    shortName: Types.String,
    description: Types.String,

    created: { type: Types.Date, default: Date.now },
    modified: { type: Types.Date, default: null },
    deleted: { type: Types.Date, default: null },
})