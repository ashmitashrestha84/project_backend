import mongoose, {Schema } from "mongoose";
import imageSchema from "./image.model";

export interface IProduct extends Document{  //tells the typescript that the object has mongoose document
    name:String,
    description:String, //returns the data into object and we can use object to modify the data
    product_image:{
        path:string,
        public_id:string,
    }|null;
}


const productSchema= new Schema<IProduct>({
    name:{
        type:String,
        required:[true,"productName is required"],
        unique:true,
        trim:true,
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
    }
})

const Product = mongoose.model<IProduct>("product",productSchema);

export default Product;