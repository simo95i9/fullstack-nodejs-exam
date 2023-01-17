import mongoose from 'mongoose'
const Types = {...mongoose.Schema.Types}

export const Order = new mongoose.Schema({
    account: { type: Types.ObjectId, ref: 'Account' },

    products: [{
        product: { type: Types.ObjectId, ref: 'Product' },
        unitPrice: Types.Number,
        count: Types.Number,
    }],

    created: { type: Types.Date, default: Date.now },
    modified: { type: Types.Date, default: null },
    deleted: { type: Types.Date, default: null },
})