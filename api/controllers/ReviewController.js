const Review=require('../models/ReviewModel')
const mongoose=require('mongoose')

const getReviews = async(req,res)=>{
    const review = await Review.find(req.query).limit(req.query.limit).sort({rating:-1})
    res.status(200).json(review)
}


const getReview = async(req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such package exists'})
    }
    const review=await Review.findById(id)
    if(!review){
        return res.status(404).json({error:'No such package found'})
    }

  res.status(200).json(review)
}


const createReview = async (req,res)=>{
    const { author,
        place,
        image,
        reviewnote,
        rating
        } = req.body
        //add to db
    try{
    
    const review = await Review.create({ author,
        place,
        image,
        reviewnote,
        rating})
    res.status(200).json({review})}
    
    catch(error){
     
        if (error.name === 'ValidationError') {
            res.status(400).json({error: "Please provide all the required fields"})
        } 
        else {
            res.status(500).json({error: "Unexpected error occurred"})
        }
    
    }
}


const deleteReview = async (req,res)=>{
    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such review to delete'})
    }
    try{
    const review = await Review.findOneAndDelete({_id:id})
    if(!review){
        return res.status(400).json({error:'No such review found'})  
    }
    res.status(200).json(review)
        }
    catch(error){
    res.status(500).json({ error: 'Server Error' });    
        }}

//update

const updateReview = async (req,res)=>{

    const {id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such review to delete'})
    }
    try{
    const review = await Review.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!review){
        return res.status(400).json({error:'No such review found'})  
    }
    res.status(200).json(review)
    }
    catch(error){
        res.status(500).json({ error: 'Server Error' });
    }
}

module.exports={
    createReview,
    getReviews,
    getReview,
   deleteReview,
   updateReview
}