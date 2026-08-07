import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import Product from "../models/product.model";
import appError from "../utils/appError.utils";
import Review from "../models/review.model";
import { sendResponse } from "../utils/sendResponse.utlis";



export const createReview=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{

    const user = req.user._id;
    const {product,rating,text}=req.body;

    const existProduct=await Product.findOne({_id:product});
    if(!existProduct) throw new appError("Product doesnot exists",404);

    const existReview = await Review.findOne({product, user})
    if (existReview) throw new appError("Review already made",400);

    const review= new Review({user,product,rating,text});
    await review.save();

     res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
});


    export const getAll= catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user=req.user._id;
    const review= await Review.findOne({user}).populate("product");
    if(! review ) throw new appError("No review exists",404);
    sendResponse(res,{
        message:"Product fetched successfully",
        statusCode:201,
        data:review,
       });
})



//getbyId
export const getbyId= catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user=req.user._id;
    const {id}=req.params;
    const review= await Review.findOne({_id:id,user}).populate("product");
    if(! review ) throw new appError("No review exists",404);
    sendResponse(res,{
        message:"Product fetched successfully",
        statusCode:201,
        data:review,
       })
})