import { Request,Response, NextFunction } from "express";
import Brand from "../models/brand.model";
import appError from "../utils/appError.utils";

// createBrand()
export const create=async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const {name,description}=req.body;
    if(!name) throw new appError("name is required",404);
    if(!description) throw new appError("description is required",404);
    const brand =new Brand({name,description});
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
catch(error)
{
    next(error);
}}

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const brands = await Brand.find();

    res.status(200).json({
      message: "Brands fetched successfully",
      success: true,
      status: "success",
      data: brands,
    });
  } catch (error) {
    next(error);
  }
};

// Get Brand By ID
export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;
    const brand = await Brand.findOne({_id:id});
    if (!brand) throw new appError("Brand not found", 404);
    res.status(200).json({
      message: "Brand fetched successfully",
      success: true,
      status: "success",
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

// Update Brand
export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

// Delete Brand
export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id} = req.params;
    const brand = await Brand.findOneAndDelete({_id:id});
    if (!brand)throw new appError("Brand not found", 404);
    res.status(200).json({
      message: "Brand deleted successfully",
      success: true,
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};