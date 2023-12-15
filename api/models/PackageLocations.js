const mongoose = require('mongoose')


const packageLocationSChema = new mongoose.Schema(
    {
        location:{
            type:String,
            required:true
        },
        img:{
            type:String,
            required:true
        }
    },{timeseries:true}
)

module.exports = mongoose.model('PackageLocations', packageLocationSChema)