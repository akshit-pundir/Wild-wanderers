const express=require("express");
const router=express.Router({ mergeParams:true });
const campground=require('../models/campground');
const Review=require("../models/review.js");
const{validateReview ,isLoggedIn, VerifyAuthor,ReviewAuthor}=require("../middlewareAuth");
const CatchAsync=require("../utilities/CatchAsync");
const camps=require("../controllers/review.js")




router.post('/' ,  isLoggedIn,validateReview,CatchAsync(camps.createReview ))

router.delete('/:reviewID', isLoggedIn,ReviewAuthor ,CatchAsync(camps.deleteReview )
     )





module.exports=router;

