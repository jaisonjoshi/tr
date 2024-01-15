const express=require('express')
const router=express.Router()
const Review=require('../models/ReviewModel')
const { createReview,
    getReviews,
    deleteReview,updateReview, getReview
}=require('../controllers/ReviewController')


router.get('/',getReviews)


router.get('/:id',getReview)
router.post('/',createReview)


router.delete('/:id',deleteReview)

router.patch('/:id',updateReview)

module.exports=router