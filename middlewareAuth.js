const { campgroundSchema }=require('./schema');
const ExpressError=require("./utilities/ExpressError");
const campground=require('./models/campground');
const { reviewSchema }=require('./schema.js');
const Review=require("./models/review.js");



module.exports.isLoggedIn=(req,res,next)=>{

   
    if(!req.isAuthenticated()  ){
        req.session.returnTo = req.originalUrl;
       req.flash('error','you must be signed in');
        return res.redirect('/login');
    }
    next();
};

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
};


module.exports.validateCampground=(req,res,next)=>{
   
    const {error}=campgroundSchema.validate(req.body);
    console.log(error);
    if(error){
         const msg=error.details.map(el => el.message).join(',');
         throw new ExpressError(msg,400);
        }         
        else{
            next();
        }
    };

module.exports.VerifyAuthor= async(req,res,next) => {
        
        const {id}=req.params;
       const camp=await campground.findById(id);

        if(!camp.author.equals(req.user._id)){
            req.flash('error',"you do not have authorization ");
            return res.redirect(`/campgrounds/${id}`);
        }
        next();
    };
    
    module.exports.ReviewAuthor= async(req,res,next) => {
            
           const{ id , reviewID }=req.params;
           const campReview=await Review.findById(reviewID);
    
            if(!campReview.author.equals(req.user._id)){
                req.flash('error',"you do not have authorization ");
                return res.redirect(`/campgrounds/${id}`);
            }
            next();
        };
            

module.exports.validateReview=(req,res,next)=>{

        const {error}=reviewSchema.validate(req.body);
        if(error){
        
            const msg=error.details.map(el => el.message).join(',');
            throw new ExpressError(msg,400);
    }         
    else{
    next();
    }
    
    }
    