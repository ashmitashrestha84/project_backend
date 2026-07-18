import { Request,Response, NextFunction } from "express";
import Brand from "../models/brand.model";
import appError from "../utils/appError.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { deleteFile, upload } from "../utils/cloudinary.utlis";
import { sendResponse } from "../utils/sendResponse.utlis";
import { getPagination } from "../utils/pagination.utlis";
const uploadFolder="/brands";

// createBrand()
export const create=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  const file=req.file;
    const {name,description}=req.body;
    const existingBrand= await Brand.findOne({name});
     if (existingBrand) {
      throw new appError("Brand already exists", 409);
    }
    const brand =new Brand({name,description});
    
    if(file){
      const {path,public_id}=await upload(file, uploadFolder);
      brand.logo={
        path,
        public_id,
      }
    }
    

        //!save user
    await brand.save();

    //* success response
    sendResponse(res,{
      message: "Brand registered",
      statusCode:201,
      data: brand,
    });
}
);
    //* getall
    export const getAll = catchAsync(async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      const { query , order="DESC" ,sortBy="createdAt",page=1,limit=10} = req.query;
      const currentPage=Number(page);
      const perPage=Number(limit);

      const skip=(currentPage-1) * perPage;

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
        // filter.name = {
        //   $regex: query,
        //   $options: "i",
        // };
      const brand = await Brand.find(filter)
      .limit(perPage)
      .skip(skip)
      .sort({
        [sortBy as string]:order === "DESC" ? -1:1
      });

      const totalCount= await Brand.countDocuments(filter);


      sendResponse(res, {
        message: "Brands fetched successfully",
        statusCode: 200,
      data: {brand,pagination:getPagination(totalCount,perPage,currentPage)},
      });
    });

    



    // Get Brand By ID
    export const getById = catchAsync(async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
        const {id} = req.params;
        const brand = await Brand.findOne({_id:id});
        if (!brand) throw new appError("Brand not found", 404);
        sendResponse(res,{
          message:"brand fetched",
          statusCode:201,
          data:brand,
        })
      });

    // Update Brand
    export const update = catchAsync(async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      const file=req.file;
        const {id} = req.params;
       const {name,description}=req.body;

       const brand= await Brand.findOne({_id:id});

      if(!brand) throw new appError("Brand doesnot exist",404);
      if(name) brand.name=name;
      if(description) brand.description=description;

      if(file){
        await deleteFile(brand.logo.public_id);
        const {path,public_id} =await upload(file,uploadFolder);
        brand.logo={
          path,
          public_id,
        } 
      }
        await brand.save();
          sendResponse(res,{
            message:"Category updated",
            statusCode:201,
            data:brand,
          })
    });

    
    // Delete Brand
    export const remove = catchAsync(async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
        const {id} = req.params;
        const brand = await Brand.findOneAndDelete({_id:id});
        if (!brand) throw new appError("Brand not found", 404);
        if(brand.logo.public_id){
          await deleteFile(brand.logo.public_id);
        }
        sendResponse(res,{
          message: "Brand deleted successfully",
          statusCode:201,
          data: null,
        });
      });