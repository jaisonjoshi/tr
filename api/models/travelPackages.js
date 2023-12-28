const mongoose = require('mongoose')


const LocationTags = new mongoose.Schema(
    {
        location:{
            type:String
        },
        img:{
            type:String
        }
    }
)
const Seo = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    keywords:{type:String}
})
const Schedule = new mongoose.Schema(
    {
        dayTitle:{type:String},
        dayDesc:{type:String}
    }
)
const CardTags = new mongoose.Schema({
    cardTag1:{type:String},
    cardTag2:{type:String}
})
const Activity = new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    img:{type:String}
})

const packageSChema = new mongoose.Schema(
    {
        uploaded:{
            type:Boolean,
            required:true
        },
        title:{
            type:String,
            required: true
        },
        titleImage:{
            type:String
        },
        images:{
            type:[String],
            required:true
        },
        shortDescription:{
            type:String
        },
        descriptionTitle:{
            type:String
        },
        description:{
            type:String
        },
        price:{
            type:Number,
        },
        duration:{
            type:String
        },
        shortDuration:{
            type:String
        },
        category:{
            type:String || null,
        },
        location:{
            type:String
        },
        locationTags:{
            type:[LocationTags]
        },
        schedule:{type:[Schedule]},
        seo:{
            type:Seo
        },
        cardTags:{
            type:CardTags
        },
        activities:{
            type:[Activity]
        }

        
    },{timeseries:true}
)

module.exports = mongoose.model('travelPackages', packageSChema)