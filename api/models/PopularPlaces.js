const mongoose = require('mongoose')


const PopularPlaces  = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{type:String, required:true},
    

})


module.exports = mongoose.model('PopularPlaces', PopularPlaces)