//name,description,logo
import mongoose from "mongoose";

const brandSchema= new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required here"],
        minLength:[3,"length must be greater than 3"],
        trim:true,
    },
    description:{
        type:String,
        required:[true,"description is required"],
        minLength:[10,"length must be greater than 10"],
        trim:true,
    },
    logo:{
        type: String,
    }

},{ timestamps: true })
const Brand=mongoose.model("brand",brandSchema);
export default Brand;