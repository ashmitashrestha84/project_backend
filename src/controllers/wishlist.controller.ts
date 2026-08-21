import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync.utils";
import { Wishlist } from "../models/wishlist.model";
import appError from "../utils/appError.utils";
import { sendResponse } from "../utils/sendResponse.utlis";
import Product from "../models/product.model";

// ADD TO WISHLIST
export const addToWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user._id;
    const { product_id } = req.body;

    // Check if product exists
    const existingProduct = await Product.findOne({
      _id: product_id,
    });

    if (!existingProduct) {
      throw new appError("Product not found", 404);
    }

    // Find user's wishlist
    let wishlist = await Wishlist.findOne({ user });

    // Create wishlist if it doesn't exist
    if (!wishlist) {
      wishlist = new Wishlist({
        user,
        products: [product_id],
      });

      await wishlist.save();

      return sendResponse(res, {
        statusCode: 201,
        message: "Wishlist created successfully",
        data: wishlist,
      });
    }

    // Check if product already exists
    const exists = wishlist.products.find((id) => id.toString() === product_id);

    if (exists) {
      throw new appError("Product already exists in wishlist", 400);
    }

    // Add product
    wishlist.products.push(product_id);

    await wishlist.save();

    sendResponse(res, {
      statusCode: 200,
      message: "Product added to wishlist successfully",
      data: wishlist,
    });
  },
);

// GET WISHLIST
export const getWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user._id;

    if (!user) {
      throw new appError("No user found", 404);
    }

    const wishlist = await Wishlist.findOne({ user }).populate({
      path: "products",
      populate: [
        {
          path: "brand",
        },
        {
          path: "category",
        },
      ],
    });

    if (!wishlist) {
      throw new appError("Wishlist not found", 404);
    }

    sendResponse(res, {
      message: "Wishlist fetched successfully",
      statusCode: 200,
      data: wishlist,
    });
  },
);

// REMOVE ONE PRODUCT
export const removeWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user._id;
    const { id } = req.params;

    const wishlist = await Wishlist.findOne({ user });

    if (!wishlist) {
      throw new appError("No wishlist exists", 404);
    }

    const exists = wishlist.products.find(
      (productId) => productId.toString() === id,
    );

    if (!exists) {
      throw new appError("Product not found in wishlist", 404);
    }

    wishlist.products = wishlist.products.filter(
      (productId) => productId.toString() !== id,
    );

    await wishlist.save();

    sendResponse(res, {
      message: "Product removed from wishlist successfully",
      statusCode: 200,
      data: wishlist,
    });
  },
);

// CLEAR ENTIRE WISHLIST
export const clearWishlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user._id;

    const wishlist = await Wishlist.findOne({ user });

    if (!wishlist) {
      throw new appError("No wishlist exists", 404);
    }

    wishlist.products = [];

    await wishlist.save();

    sendResponse(res, {
      message: "Wishlist cleared successfully",
      statusCode: 200,
      data: wishlist,
    });
  },
);
