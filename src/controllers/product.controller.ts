import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse.utlis";
import { catchAsync } from "../utils/catchAsync.utils";
import Product from "../models/product.model";
import appError from "../utils/appError.utils";
import { upload } from "../utils/cloudinary.utlis";



const uploadFolder="/products";


//* getall
export const getAll=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const product = await Product.find();

    //* send success response
    sendResponse(res,{
      message:"Product fetched",
      statusCode:200,
      data:product,
    })
})

//*get by id
export const getById=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params
    const product=await Product.findOne({_id:id});
    if(!product) throw new appError("No product exits",404)
    sendResponse(res,{
        message:"Product fetched",
        statusCode:200,
        data:product,
    })
})


//* create
export const create=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const file=req.file;
    const {name,price,description}=req.body;
    if(!name) throw new appError("Name is required",404);
    if(!description) throw new appError("Description is required",404);
    if(!price) throw new appError("price is required",404);

    const existingname= await Product.findOne({name})
    if(existingname) throw new appError("Name already exists",404);

    const product= new Product({name,description})

     if(file){
        const {path,public_id}= await upload(file,uploadFolder);
     product.product_image={
        path,
        public_id,
     }
    }
    await product.save;

    sendResponse(res,{
        message:"Product created",
        statusCode:200,
        data:product
    })
})

export const update=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params;
    const {name,price,description}=req.body;
       if(!name) throw new appError("Name is required",404);
        if(!description) throw new appError("Description is required",404);
        if(!price) throw new appError("price is required",404);

    const product=await Product.findByIdAndUpdate({_id:id},req.body,{
        new:true,
        runValidators:true,
    })

    if(!product ) throw new appError("Product is required",404);

    sendResponse(res,{
        message:"Product Updated",
        statusCode:200,
        data:product
    })
})

//* Delete
export const remove = catchAsync(async (req: Request,res: Response,next: NextFunction) => {
    const {id} = req.params;
    const product = await Product.findOneAndDelete({_id:id});
    if (!product) throw new appError("Product not found", 404);
    res.status(200).json({
      message: "Product deleted successfully",
      success: true,
      status: "success",
      data: null,
    });
  });


  //* get by category


  //* get by brand


  //* get new_arrival


  //* get featured