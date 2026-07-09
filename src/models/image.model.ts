import mongoose from "mongoose";


const imageSchema= new mongoose.Schema({
        path:{
          type:String,
          required:[true,"path is required"],
        },
        public_id:{
          type:String,
          required:[true,"public_id is required"],
        }
},
{_id:false})

export default imageSchema;