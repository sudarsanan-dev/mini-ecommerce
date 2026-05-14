const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    // _id:{
    //     type:String,
    //     required:true
    // },
    name : String,
    price: Number,
    description : String,
    ratings: Number,
    images:[
        {
            image: String
        }
    ],
    catagory: String,
    seller: String,
    stock: Number,
    numOfReviews: Number,
    createdAT: Date
});
const productModel = mongoose.model('Product',productSchema);
module.exports = productModel;