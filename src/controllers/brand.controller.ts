import { Request,Response, NextFunction } from "express";
import Brand from "../models/brand.model";
import appError from "../utils/appError.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { upload } from "../utils/cloudinary.utlis";
import { sendResponse } from "../utils/sendResponse.utlis";
const uploadFolder="/brands";

// createBrand()
export const create=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
  const file=req.file;
    const {name,description}=req.body;
    if(!name) throw new appError("name is required",404);
    if(!description) throw new appError("description is required",404);
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
    res.status(201).json({
      message: "Brand registered",
      success: true,
      status: "success",
      data: brand,
    });
}
);

export const getAll = catchAsync(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const brand = await Brand.find();
//.lean
    //* success response
    sendResponse(res,{
      message:"Brand created",
      statusCode:201,
      data:brand,
    })
 })


// Get Brand By ID
export const getById = catchAsync(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const {id} = req.params;
    const brand = await Brand.findOne({_id:id});
    if (!brand) throw new appError("Brand not found", 404);
    res.status(200).json({
      message: "Brand fetched successfully",
      success: true,
      status: "success",
      data: brand,
    });
  });

// Update Brand
export const update = catchAsync(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const {id} = req.params;
    const brand = await Brand.findOneAndUpdate({_id:id}, req.body, {
      new: true,
      runValidators: true,
    });
    if (!brand) throw new appError("Brand not found", 404);
    res.status(200).json({
      message: "Brand updated successfully",
      success: true,
      status: "success",
      data: brand,
    });
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
    res.status(200).json({
      message: "Brand deleted successfully",
      success: true,
      status: "success",
      data: null,
    });
  });