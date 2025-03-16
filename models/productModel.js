const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please enter a product name"]
        },
        quantity:{
            type:Number,
            required:[true,"Please enter a number"]
        },
        price:{
            type:Number,
            required:[true,"Pleaes correct price in number format"]
        },
        image:{
            type:String,
            required:false
        }


    },
    {
        timestamps:true
    }

)

const Product = mongoose.model('Product',productSchema);
module.exports = Product;