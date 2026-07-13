//name,description,logo
import mongoose, { Schema } from "mongoose";
import imageSchema from "./image.model";

export interface IBrand extends Document {
  name: string;
  description?: string;
  logo: {
    path: string;
    public_id: string;
  } | null;
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
    }

},{ timestamps: true })
const Brand=mongoose.model<IBrand>("brand",brandSchema);
export default Brand;