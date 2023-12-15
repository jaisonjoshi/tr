const mongoose = require('mongoose')


const Admin  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true
    }

})


module.exports = mongoose.model('AdminModel', Admin)