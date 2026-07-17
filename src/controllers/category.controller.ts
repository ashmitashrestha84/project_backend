import { Request, Response, NextFunction } from "express";
import Category from "../models/category.model";
import { catchAsync } from "../utils/catchAsync.utils";
import AppError from "../utils/appError.utils";
import { deleteFile, upload } from "../utils/cloudinary.utlis";
import { sendResponse } from "../utils/sendResponse.utlis";
import appError from "../utils/appError.utils";
const uploadFolder="/categories";


export const getAll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

      const { query } = req.query;

  const filter: Record<string, any> = {};

  if (query) {
       filter.$or=[
      {
        name:{
          $regex:query,
          $options:"i",
        }
      },
      {
        description:
        {
          $regex:query,
          $options:"i",
        }
      }
    ]
  }
  const categories = await Category.find(filter);

    sendResponse(res,{
      message:"category fetched successfully",
      statusCode:201,
      data: categories,
    });
  },
);

export const getById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      throw new AppError("category not found", 404);
    }

    sendResponse(res,{
      message: `category by id ${id} is fetched`,
      statusCode:201 ,
      data: category,
    });
  },
);


export const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const file=req.file;
    const { name, description } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      throw new AppError("name already exists", 404);
    }

  const category = new Category({ name, description });
  if (file) {
    const { path, public_id } = await upload(file, uploadFolder);
    category.logo = {
      path,
      public_id,
    };
  }

  await category.save();
      sendResponse(res,{
        message: "Category created successfully",
        statusCode:201,
        data: category,
      });
    },
  );



    export const update = catchAsync(async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      const file=req.file;
        const {id} = req.params;
       const {name,description}=req.body;

       const category= await Category.findOne({_id:id});

      if(!category) throw new appError("Brand doesnot exist",404);
      if(name) category.name=name;
      if(description) category.description=description;
      if(file){
        await deleteFile(category.logo.public_id);
        const {path,public_id}= await upload(file,uploadFolder);
        category.logo={
          path,
          public_id,
        }
      }
      await category.save();
      sendResponse(res,{
        message:"Category updated",
        statusCode:201,
        data:category,
      })

    });

export const remove = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete({ _id: id });

    if (!category) {
      throw new AppError("category not found.", 404);
    }
    if(category.logo.public_id){
      await deleteFile(category.logo.public_id);
    }

    sendResponse(res,{
      message: "category deleted successfully.",
      statusCode:201,
      data: null,
    });
  },
);
