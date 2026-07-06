import { Request, Response, NextFunction } from "express"
import { RequestHandler } from "express";



export const catchAsync=(fn:RequestHandler)=>{
    return(req:Request,res:Response,next:NextFunction)=>{
        // try{
        //     fn(req,res,next);
        // }
        // catch(error){
        //     next(error);
        // }
        Promise.resolve((fn(req,res,next)))
        .catch((error)=>next(error))
}
}