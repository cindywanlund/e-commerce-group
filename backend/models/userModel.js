const mongoose = require('mongoose')

const userSchema  = mongoose.Schema({
    username :{
        type : String,
        required : [true, 'Please add name of the user'],
        unique: true
    },
    pwd :{
        type : String,
        required : [true, 'Please add pwd of the user']
    },
    email :{
        type : String,
        required : [true, 'Please add email of the user'],
        unique: true
    },
}, {
    timestamps : true
})
module.exports = mongoose.model('User',userSchema)