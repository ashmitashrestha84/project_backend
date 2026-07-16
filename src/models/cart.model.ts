//{ user:user_id, items[{product_id,quantity:number}]}

import mongoose, { Document } from "mongoose"

export interface ICart extends Document{
    
    user_id:mongoose.Types.ObjectId,
    items:{product_id:mongoose.Types.ObjectId,
    quantity:Number}[];
    }

const cartSchema=new mongoose.Schema<ICart>({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"user is required"],
        ref:'user',
    },
    items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: [true, "Product is required"],
      },

      quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: 1,
        default: 1,
      },
    },
  ],
})

export const Cart=mongoose.model<ICart>("cart",cartSchema);