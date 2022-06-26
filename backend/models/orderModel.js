const mongoose = require('mongoose')
const {Schema} = require("mongoose");

const orderSchema = mongoose.Schema({
    //_id: Schema.Types.ObjectId,
    user: {
        required: [true, 'Please add id of the user ordering'],
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    product: {
        required: [true, 'Please add id of the product to be ordered '],
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: [true, 'Please add quantity to be ordered']
    },
    status: {
        type: String,
        required: [true, 'Please add status of the order']
    },
}, {
    timestamps: true
})
module.exports = mongoose.model('Order', orderSchema)