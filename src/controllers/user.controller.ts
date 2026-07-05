import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import appError from "../utils/appError.utils";

//!get all Users
export const getAll=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const users=await User.find({role:'USER'})
            res.status(201).json({
                message:"User fetched",
                status:"Success",
                success:true,
                data:users,
            })
        }
        catch(error){
            next(error)
        }
}

//!get all admins
export const getAllAdmins=async(req:Request,res:Response,next:NextFunction)=>{
        try{
            // const admins=await User.find({role:"ADMIN"})
            const admins=await User.find({role:{$in:["ADMIN","SUPERADMIN"]}})
            res.status(201).json({
                message:"User fetched",
                status:"Success",
                success:true,
                data:admins,
            })
        }
        catch(error){
            next(error)
        }
}



//!getbyID
export const getbyId=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {id}=req.params;
        const users=await User.findOne({id:id});
        if(!users){
            throw new appError("user not found",404)
        }
        res.status(200).json({
            message:`user:${id} fetched`,
            success:true,
            status:"success",
            data:users,
        })
    }
catch(error){
    next(error)
}
}