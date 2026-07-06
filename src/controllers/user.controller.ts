import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import appError from "../utils/appError.utils";
import { catchAsync } from "../utils/catchAsync.utils";

//!get all Users
export const getAll=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
            const users=await User.find({role:'USER'})
            res.status(201).json({
                message:"User fetched",
                status:"Success",
                success:true,
                data:users,
            })
})

//!get all admins
export const getAllAdmins=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
            // const admins=await User.find({role:"ADMIN"})
            const admins=await User.find({role:{$in:["ADMIN","SUPERADMIN"]}})
            res.status(201).json({
                message:"User fetched",
                status:"Success",
                success:true,
                data:admins,
            })
        });



//!getbyID
export const getbyId=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const {id}=req.params;
        const users=await User.findOne({_id:id});
        if(!users){
            throw new appError("user not found",404)
        }
        res.status(200).json({
            message:`user:${id} fetched`,
            success:true,
            status:"success",
            data:users,
        })
})