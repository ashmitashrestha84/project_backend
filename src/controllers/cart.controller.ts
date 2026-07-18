import { Request, NextFunction, Response } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import { Cart } from "../models/cart.model";
import appError from "../utils/appError.utils";
import Product from "../models/product.model";
import { sendResponse } from "../utils/sendResponse.utlis";




export const create = catchAsync(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.user._id;
  const { product_id, quantity } = req.body;

  //* Check if product exists
  const product = await Product.findById(product_id);
  if (!product) {
    throw new appError("Product not found", 404);
  }

  //* Find user's cart
  let cart = await Cart.findOne({ user_id });

  //* If cart doesn't exist, create it
  if (!cart) {
    cart = new Cart({
      user_id,
      items: [
        {
          product_id,
          quantity,
        },
      ],
    });

    await cart.save();
    sendResponse(res, {
      message: "Cart created successfully",
      statusCode: 201,
      data: cart,
    });
  }

  //* Check if product already exists in cart
  const item = cart.items.find(
    (item) => item.product_id.toString() === product_id
  );

  if (item) {
    item.quantity += quantity;
  } else {
    cart.items.push({
      product_id,
      quantity,
    });
  }

  await cart.save();

  sendResponse(res, {
    message: "Cart updated successfully",
    statusCode: 200,
    data: cart,
  });
});

//get

export const getCart=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user_id=req.user._id;
    const cart= await Cart.findOne({user_id}).populate("items.product_id");
    if(!cart) throw new appError("no items in cart",404);

    sendResponse(res,{
        message:"Cart fetched successfully",
        statusCode:201,
        data:cart,
    })
})

//update

export const updateCart=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user_id=req.user._id;
    const { product_id,quantity}=req.body;

    const cart= await Cart.findOne({user_id})

    if (!cart) {
      throw new appError("no card exists", 404);
    }

    const item= cart.items.find((item)=>item.product_id.toString()===product_id);
    
    if (!item) {
      throw new appError("No product found in cart", 404);
    }

    item.quantity = quantity;

    await cart.save();

    sendResponse(res, {
      message: "Cart updated successfully",
      statusCode: 200,
      data: cart,
    });

    sendResponse(res, {
      message: "Cart updated successfully",
      statusCode: 200,
      data: cart,
    });
})


//delete cart
export const deleteCart=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user_id=req.user._id;
    const { product_id}=req.body;

    const cart= await Cart.findOne({user_id});
    if (!cart) {
      throw new appError("No cart exists", 404);
    }

    cart.items= cart.items.filter((item)=>item.product_id.toString()!==product_id);

    await cart.save();
    sendResponse(res, {
      message: "Cart removed successfully",
      statusCode: 200,
      data: cart,
    });
})

//clear cart

export const clearCart=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const user_id=req.user._id;

    const cart= await Cart.findOne({user_id});
    if (!cart) {
      throw new appError("No cart exists", 404);
    }

    cart.items= [];

    await cart.save();
    sendResponse(res, {
      message: "Cart removed successfully",
      statusCode: 200,
      data: cart,
    });
})
