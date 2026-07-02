import express, { NextFunction,Request, Response } from "express";
// @types_packageName -> npm i -D  @types_packageName
//* creating app instances
const app=express();

//! using middlewares



//! using routes




//* health routes
app.get("/",(req: Request, res: Response, next:NextFunction)=>{
    res.status(400).json({
        message:"Server is up & running",
        success:true,
        status:"message",
        data:null,
    })
});


//! path not found
app.use((req:Request, res:Response, next:NextFunction)=>{
    const message=`Cannot ${req.method} on ${req.path}`;
    res.status(404).json({
        message,
        success:false,
        status:'fail',
        data:null,
    })
})






export default app