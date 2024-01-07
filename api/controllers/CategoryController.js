const mongoose = require("mongoose");
const Category = require("../models/Category");



const getCategories = async (req,res) => {
    const categories = await Category.find({})
    res.status(200).json(categories)
}

const getCategoriesClient = async (req,res) => {
    const categories = await Category.find({}).populate('packages', 'title titleImage shortDuration shortDescription price cardTags location')
    res.status(200).json(categories)
}

const getCategory = async (req, res) => {
    const {id} = req.params

    const category = await Category.findById(id).populate('packages','title titleImage shortDuration shortDescription price cardTags location')
    res.status(200).json(category)
}


const createCategory = async (req,res) => {
    try {
        const category = await Category.create(req.body)
        res.status(200).json(category)

    } catch (error) {
        console.log(error)
    }
}

const deleteCategory = async (req, res) => {
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such hotel to delete'})
    }
    try{
    const category=await Category.findOneAndDelete({_id:id})
    if(!category){
        return res.status(400).json({error:'No such hotel found'})  
    }
    res.status(200).json(category)
}
catch (error){
    res.status(500).json({ error: 'Server Error' }); 
}
}





const updateCategory = async (req,res)=>{
    const {id}=req.params
    console.log(id)
    console.log(req.body)
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such Pacakge to delete'})
    }
    try{
    const category = await Category.findOneAndUpdate({_id:id},{
        ...req.body
    })
    
    if(!category){
        return res.status(400).json({error:'No such package found'})  
    }
    res.status(200).json(category)
    }
    catch(error){
        res.status(500).json({ error: "server error" });
    }

}


module.exports = { getCategories,createCategory ,deleteCategory, getCategory ,updateCategory, getCategoriesClient};
