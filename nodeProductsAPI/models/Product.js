const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type : String,
        required: [true, "Product name is required"],
        trim : true
    },
    price: {
        type: Number,
        required : [true, "Product price is required"],
        min: [0, "Product must be greater than 0"]
    },
    description : {
        type : String,
        trim: true,
    },
    category : {
        type : String,
        trim: true,
    },
    inStock : {
        type : Boolean,
        default : true
    }
},{timestamps: true});

module.exports = mongoose.model('ProductDB', ProductSchema);