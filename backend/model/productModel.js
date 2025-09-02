const mongoose = require("mongoose");

const productShema = new mongoose.Schema({
    productName:{
        type:String,
        required: [true,"enter product Name "],
    },
    productPrice:{                                                  
        type:Number,
        required: [true,"enter product price"],
    },
    productDiscription:{
        type:String,
        required: [true,"enter product discription "],
    },
    productPhotos:{
        type:[String],
        required: [true,"add product Photo"],
    },
});
const Product = mongoose.model('Product',productShema);
module.exports = Product;