import mongoose, { Schema, Document } from "mongoose";
import imageSchema from "./image.model";

//* Interface
export interface ICategory extends Document {
  name: string;
  description?: string;
  logo: {
    path: string;
    public_id: string;
  } | null;
}

//* Category Schema
const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
      minLength: 2,
      maxLength: 100,
    },

    description: {
      type: String,
      trim: true,
      minLength: 5,
      maxLength: 500,
    },

    logo: {
      type: imageSchema,
      default:null,
    },
  },
  {
    timestamps: true,
  },
);

//* Category Model
const Category = mongoose.model<ICategory>("category", categorySchema);

export default Category;
