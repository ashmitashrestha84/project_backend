import mongoose from "mongoose";

export const connectDatabase=(DB_URI:string)=>{
    console.log(process.env.DB_URI);
    mongoose.connect(DB_URI)
    .then(()=>{
        console.log("Database connected at atlas");
    })
    .catch((error)=>{
        console.log("----database connection error-----");
        console.log(error)
    })
}