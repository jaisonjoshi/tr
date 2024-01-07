const mongoose = require('mongoose')


const Category  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    uploaded:{type:Boolean, required:true},
    description:{type:String, required:true},
    packages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'travelPackages'
    }]

})


module.exports = mongoose.model('category', Category)