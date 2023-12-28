const mongoose = require('mongoose')
const Package = require('../models/travelPackages')



const getPackages =  async (req, res) => {
    const {uploaded} = req.query
     const query = {}
    if(uploaded) query.uploaded = uploaded;
    const packages =  await Package.find(query)
    res.status(200).json(packages)
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

module.exports = {createPackage,getPackages, getPackage, updatePackage}