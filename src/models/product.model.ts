import mongoose from "mongoose";
import imageSchema from "./image.model";

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"productName is required"],
        minLength:3,
        trim:true,
    },
    price:{
        type:Number,
        required:[true,"price is required"],
        min:0,
    },
    description:{
        type:String,
        required:[true,"description is required"],
        minLength:5,
        trim:true,
    },
    product_image:{
        type:imageSchema,
        default:null
    },

    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"category is required"],
        ref:'category',
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"brand is requirted"],
        ref:'brand',
    },

    images:[{
        type:imageSchema,
        default:null,
    }],
    new_arrival:{
        type:Boolean,
        default:false,
    },
    is_featured:{
        type:Boolean,
        default:false,
    },
    },
    {timestamps:true}
)

const Product = mongoose.model("product",productSchema);

export default Product;