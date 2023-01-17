import mongoose from 'mongoose'
const Types = {...mongoose.Schema.Types}

export const Account = new mongoose.Schema({
    name: Types.String,
    email: { type: Types.String, unique: true },
    password: Types.String,
    admin: Types.Boolean,

    created: { type: Types.Date, default: Date.now },
    modified: { type: Types.Date, default: null },
    deleted: { type: Types.Date, default: null },
})