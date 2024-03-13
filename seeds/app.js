const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");
const campground = require("../models/campground");

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDb = async () => {
  await campground.deleteMany({});
  for (let i = 0; i < 500; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price=Math.floor(Math.random()*100 )+10;
    const camp = new campground({
      author:'65c5e6f0853a9593ca170edf',
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, praesentium repellendus aliquid quisquam veniam corrupti quos, reiciendis aspernatur unde ipsam, cum ullam! Iure, dolore? Enim iste deleniti laborum. Porro, dignissimos.',
      price:`${price}`,
      geometry:{
        type: 'Point',
        coordinates: [cities[random1000].longitude,cities[random1000].latitude ]
      },
      images:
        [
          {
            url: 'https://res.cloudinary.com/drxvblkym/image/upload/v1708772354/YELP%20CAMP/fahbukknwzmszka60avt.jpg',
            filename: 'YELP CAMP/fahbukknwzmszka60avt',
            
          },
          
          {
            url: 'https://res.cloudinary.com/drxvblkym/image/upload/v1708873339/YELP%20CAMP/jq07go7hfxjojcnsayaj.jpg',
            filename: 'YELP CAMP/xnohxtcnxamplkn1wqev',
          
          }
        ]
      

    });
    await camp.save();
  }
};

seedDb().then(()=>{
  mongoose.connection.close();
})


