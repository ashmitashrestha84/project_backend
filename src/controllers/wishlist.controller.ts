import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import { Wishlist } from "../models/wishlist.model";
import appError from "../utils/appError.utils";
import { sendResponse } from "../utils/sendResponse.utlis";
import Product from "../models/product.model";



export const addToWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user._id;
    const { product } = req.body;

    // Check if product exists
    const existingProduct = await Product.findOne({_id:product});

    if (!existingProduct) {
      throw new appError("Product not found", 404);
    }

    // Find user's wishlist
    let wishlist = await Wishlist.findOne({ user });

    // Create wishlist if it doesn't exist
    if (!wishlist) {
      wishlist = new Wishlist({
        user,
        products: [product],
      });

      await wishlist.save();

      return sendResponse(res, {
        statusCode: 201,
        message: "Wishlist created successfully",
        data: wishlist,
      });
    }

    // Check if product already exists
    const exists = wishlist.products.find(
      (id) => id.toString() === product
    );

    if (exists) {
      throw new appError("Product already exists in wishlist", 400);
    }

    // Add product
    wishlist.products.push(product);
    await wishlist.save();

    sendResponse(res, {
      statusCode: 200,
      message: "Product added to wishlist successfully",
      data: wishlist,
    });
  }
);

//get

export const getWishlist=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user=req.user._id;
    const wishlist= await Wishlist.findOne({user}).populate("product");
    if(!wishlist) throw new appError("wishlist doesnot exists",404);

    sendResponse(res,{
        message:"Wishlist fetched Successfully",
        statusCode:201,
        data:wishlist,
    })
})

//clear

export const clearWishlist=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user=req.user._id;
    const {product}=req.body;

    const wishlist= await Wishlist.findOne({user});
    if(!wishlist) throw new appError("no wishlist exists",404);

    const exists=wishlist.products.find((id)=>id.toString()!==product)
    if(!exists) throw new appError("no product exists in given wishlist",404);

    sendResponse(res,{
        message:"product is removed from wishlist",
        statusCode:201,
        data:exists,
    })
})

//delete

export const removeWishlist=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user=req.user._id;
    

    const wishlist= await Wishlist.findOne({user});
    if(!wishlist) throw new appError("no wishlist exists",404);

    wishlist.products=[]

    sendResponse(res,{
        message:"product is removed from wishlist",
        statusCode:201,
        data:wishlist.products,
    })
})