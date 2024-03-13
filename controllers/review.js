const Review = require("../models/review.js");
const campground = require("../models/campground");

module.exports.createReview = async (req, res) => {

        const camps = await campground.findById(req.params.id);
        const review = new Review(req.body.review);
        review.author = req.user._id;
        camps.reviews.push(review);
        await review.save();
        await camps.save();
        req.flash("success", "New Review Successfully Added");

        res.redirect(`/campgrounds/${camps._id}`);

};

module.exports.deleteReview = async (req, res) => {

        const { id, reviewID } = req.params;
        await campground.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });
        await Review.findByIdAndDelete(reviewID);
        req.flash("success", "Review Deleted!!");

        res.redirect(`/campgrounds/${id}`);
        
};
