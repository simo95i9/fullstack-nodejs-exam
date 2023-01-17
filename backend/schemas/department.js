import mongoose from 'mongoose'
const Types = {...mongoose.Schema.Types}

export const Department = new mongoose.Schema({
    name: Types.String,
    shortName: Types.String,
    description: Types.String,

    created: { type: Types.Date, default: Date.now },
    modified: { type: Types.Date, default: null },
    deleted: { type: Types.Date, default: null },
})