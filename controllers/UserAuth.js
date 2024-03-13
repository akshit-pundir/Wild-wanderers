const User=require("../models/user");







module.exports.renderRegister= (req,res)=>{

    res.render('user/register');


};

module.exports.renderLogin= (req,res)=>{
    res.render('user/login');
    
} 


module.exports.CreateUser=async(req,res,next)=>{
   
    try{
     const{email,username,password}=req.body;
     const user=new User({ email ,username });
     const RegisteredUser=await User.register(user, password);
   
     req.login(RegisteredUser, err=>{
         if(err){
             return next(err);
         }
         else{
             req.flash(  'success', "welcome to yelp camp");
             res.redirect('/campgrounds');
         }
     } )
 }
 catch(e){
     req.flash('error', e.message);
     res.redirect('register');
 }
 
 
 } 

module.exports.LoginCheck=(req,res)=>{

    req.flash('success',"welcome back ");
    const redirectUrl = res.locals.returnTo || '/campgrounds'; 
    delete req.session.returnTo;
    res.redirect(redirectUrl);

} 

module.exports.LogOut=(req,res) =>{

        req.logOut(function(err){
            if (err) {
                return   next(err);  }
          });

          req.flash('success',"logged you out");
          res.redirect('/campgrounds');

}
