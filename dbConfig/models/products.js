const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name : String,
    imgUrl: String,
    altImgUrl : [{
        imgUrl : String
    }],
    price : Number,
    discount : Number,
    rating : [Number],
    reviews : [String],
    emiAvailable : Boolean,
    inStock : Boolean,
    info: String,
    tags : [String]
});    


module.exports = mongoose.model('Products', productsSchema);