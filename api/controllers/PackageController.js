const mongoose = require('mongoose')
const Package = require('../models/travelPackages')



const getPackages = async (req, res) => {
    try {
        const { uploaded, locationtag } = req.query;
        
        // Build the query object based on parameters
        const query = {};
        
        if (uploaded) {
            query.uploaded = uploaded;
        }
        
        if (locationtag) {
            query.locationTags = { $elemMatch: { location: locationtag } };
        }

        console.log(query);

        // Use async/await with try-catch for better error handling
        const packages = await Package.find(query);
        
        res.status(200).json(packages);
    } catch (error) {
        // Handle any errors that occur during the execution
        console.error('Error in getPackages:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Assuming you have a global error handler middleware for uncaught errors.
// If not, you might want to consider adding one to handle unexpected errors.


const getSimplifiedPackages = async (req,res) => {
    const packages = await Package.find({}).select('_id title titleImage').lean()
    res.status(200).json(packages)
    console.log(packages)

}




const getPackage = async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such package exists'})
    }
    const pack=await Package.findById(id)
    if(!pack){
        return res.status(404).json({error:'No such package found'})
    }

  res.status(200).json(pack)
}

const createPackage = async (req, res) => {
    
    try {
        const package = await Package.create(req.body)
        res.status(200).json(package)

    } catch (error) {
        console.log(error)
    }
}

const updatePackage = async (req,res)=>{
    console.log("hello there")
    const {id}=req.params
    console.log(req.body)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Pacakge to delete'})
    }
    try{
    const pack = await Package.findOneAndUpdate({_id:id},{
        ...req.body
    })
    
    if(!pack){
        return res.status(400).json({error:'No such package found'})  
    }
    res.status(200).json(pack)
    }
    catch(error){
        res.status(500).json({ error: "server error" });
    }

}

module.exports = {createPackage,getPackages, getPackage,getSimplifiedPackages, updatePackage}