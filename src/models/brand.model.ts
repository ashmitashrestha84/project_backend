//name,description,logo
import mongoose, { Schema } from "mongoose";
import imageSchema from "./image.model";

export interface IBrand extends Document {   //tells the typescript that the object has mongoose document
  name: string;
  description?: string;//returns the data into object and we can use object to modify the data
  logo: {
    path: string;
    public_id: string;
  };
}

const brandSchema= new Schema<IBrand>({
    name:{
        type:String,
        required:[true,"name is required here"],
        minLength:[3,"length must be greater than 3"],
        unique:true,
        trim:true,
    },
    description:{
        type:String,
        required:[true,"description is required"],
        minLength:[10,"length must be greater than 10"],
        trim:true,
    },
    logo:{
        type:imageSchema,
        default:null,
        required:true,
    }

},{ timestamps: true })
const Brand=mongoose.model<IBrand>("brand",brandSchema);
export default Brand;