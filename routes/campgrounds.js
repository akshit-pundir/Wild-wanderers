const express=require("express");
const router=express.Router();
const campground=require('../models/campground');
const CatchAsync=require("../utilities/CatchAsync");
const {isLoggedIn,validateCampground,VerifyAuthor }=require("../middlewareAuth");
const camps=require("../controllers/campground");
const {storage}=require("../cloudinary");
const multer=require("multer");
const upload=multer({ storage });







router.get('/',  CatchAsync( camps.index));

router.get('/new', isLoggedIn  ,camps.renderNewForm);

router.post('/', isLoggedIn , upload.array('image') ,validateCampground,  CatchAsync(camps.createNewForm ) );



router.get('/:id', CatchAsync( camps.showPage ));


router.get('/:id/edit',isLoggedIn, VerifyAuthor,CatchAsync( camps.EditPage));

router.put('/:id', isLoggedIn  ,VerifyAuthor,upload.array('image') , validateCampground ,CatchAsync( camps.UpdatePage));

router.delete('/:id',  isLoggedIn ,VerifyAuthor,CatchAsync( camps.DeleteCamp));


module.exports=router;




