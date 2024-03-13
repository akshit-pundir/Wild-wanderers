const campground = require("../models/campground");
const {cloudinary}=require("../cloudinary");
const mbxGeocoding=require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken=process.env.MAPBOX_TOKEN;

const geocoder=  mbxGeocoding({ accessToken : mapBoxToken });



module.exports.renderNewForm = (req, res) => {
        res.render("campground/new");
};

module.exports.createNewForm = async (req, res, next) => {

        const  GeoData=await  geocoder.forwardGeocode({
            query: req.body.campground.location ,
            limit:1
        }).send()
        
        const tent = new campground(req.body.campground);
        tent.geometry=GeoData.body.features[0].geometry;   
        tent.images= req.files.map(f => ({ url: f.path , filename: f.filename  }) );
        tent.author = req.user._id;
        await tent.save();
        
        req.flash("success", "New Campground Successfully Added");
        res.redirect(`/campgrounds/${tent._id}`);
    
    };
        


module.exports.showPage = async (req, res, next) => {
    
        const { id } = req.params;
        const camps = await campground
            .findById(id)
            .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
            })
            .populate("author");

        if (!camps) {
            req.flash("error", "campground not found!");
            return res.redirect("/campgrounds");
        }

        res.render("campground/show", { camps });

    };

module.exports.EditPage = async (req, res) => {
  
        const { id } = req.params;
        const camps = await campground.findById(id);
        req.flash("success", " Campground Successfully Updated");
        res.render("campground/edit", { camps });

};

module.exports.UpdatePage = async (req, res) => {
        
        const { id } = req.params;
        // console.log(req.body);
        const campUpdate = await campground.findByIdAndUpdate(id, { ...req.body.campground,});
        const imgs=req.files.map(f => ({ url: f.path , filename: f.filename  }) ) 
        campUpdate.images.push(...imgs);
        await campUpdate.save();
        if(req.body.DeleteImages){
            for(let filename of req.body.DeleteImages){
                await cloudinary.uploader.destroy(filename)
            }
            await  campUpdate.updateOne({$pull:  {   images: {  filename: {$in: req.body.DeleteImages}   } }   });
            console.log(campUpdate);
        }
        req.flash("success", " Successfully Updated");
        res.redirect(`/campgrounds/${campUpdate._id}`);

    };

module.exports.index = async (req, res) => {
            const camps = await campground.find({});

            res.render("campground/index", { camps });
};

module.exports.DeleteCamp = async (req, res) => {

            const { id } = req.params;
            await campground.findByIdAndDelete(id);
            req.flash("success", " Campground Deleted successfully");

            res.redirect("/campgrounds");

        };
