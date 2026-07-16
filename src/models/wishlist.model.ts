//product:  ,user:

import mongoose from "mongoose";

const wishlistSchema= new mongoose.Schema({
      products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required:true,
    },
  ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user is required"],
        ref:"user",
    }
})

export const Wishlist=mongoose.model("wishlist",wishlistSchema);