const express=require("express");
const router=express.Router();
const User=require("../models/user"); 
const CatchAsync=require("../utilities/CatchAsync");
const passport = require("passport");
const { storeReturnTo } = require('../middlewareAuth');
const camps=require("../controllers/UserAuth")


router.get('/register', camps.renderRegister);

router.post('/register',CatchAsync( camps.CreateUser )  );

router.get('/login',  camps.renderLogin);

router.post('/login',  storeReturnTo , passport.authenticate('local',{failureFlash:true ,failureRedirect:'/login' }) , camps.LoginCheck);

router.get('/logout', camps.LogOut);


module.exports=router;













