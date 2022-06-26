const mongoose = require('mongoose')

const productSchema  = mongoose.Schema({
    name :{
        type : String,
        required : [true, 'Please add name of the product']
    },
    assortment :{
        type : String,
        required : [true, 'Please add the type of the product']
    },
}, {
    timestamps : true
})
module.exports = mongoose.model('Product',productSchema)