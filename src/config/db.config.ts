import mongoose from "mongoose";

export const connectDatabase=(DB_URI:string)=>{
    mongoose.connect(DB_URI)
    .then(()=>{
        console.log("Database connected");
    })
    .catch((error)=>{
        console.log("----database connection error-----");
        console.log(error)
    })
}