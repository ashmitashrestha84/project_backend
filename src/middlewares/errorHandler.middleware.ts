import { NextFunction, Request, Response } from "express";

export const errorHandler=(
    error:any,
    req:Request, 
    res:Response, 
    next:NextFunction,
)=>{
    console.log(error);
    const message=error?.message ?? "Internal Server Error";
    const status=error?.status ?? "error";
    const statusCode=error?.statusCode ?? 500;
    const success=false;

    res.status(200).json({
        message,
        success,
        status,
        statusCode,
        data:null,
        originalError: error?.stack,
    })
}