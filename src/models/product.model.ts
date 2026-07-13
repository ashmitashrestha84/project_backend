import mongoose, {Schema } from "mongoose";
import imageSchema from "./image.model";

// export interface IProduct extends Document{  //tells the typescript that the object has mongoose document
//     name:String,
//     description:String, //returns the data into object and we can use object to modify the data
//     price:Number,
//     product_image:{
//         path:string,
//         public_id:string,
//     },
//     images:[{
//         path:string,
//         public_id:string,
//     }]|null;
// }


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
    }]
    },
    {timestamps:true}
)

const Product = mongoose.model("product",productSchema);

export default Product;