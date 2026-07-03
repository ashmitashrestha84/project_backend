import { NextFunction, Request, Response } from "express";

export const errorHandler=(
    error:any,
    req:Request, 
    res:Response, 
    next:NextFunction,
)=>{
    console.log(error);
    const message=error?.message ?? "Internal Server Error";
    let status=error?.status ?? "error";
    let statusCode=error?.statusCode ?? 500;
    const success=false;

    if(error?.cause?.code===11000){
        statusCode=400;
        status="fail";
    }
    console.log(error?.cause?.code);

    res.status(statusCode).json({
        message,
        success,
        status,
        statusCode,
        data:null,
        originalError: error?.stack,
    })
}