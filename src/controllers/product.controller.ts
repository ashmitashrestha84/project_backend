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
    const {product_image,images}=req.files as {
        product_image?:Express.Multer.File[],
        images?: Express.Multer.File[],
    };
    const {name,price,description,category,brand,new_arrival,is_featured}=req.body;

     if(!product_image || !product_image[0]){
            throw new appError("product image is required",400)
        }

        const product = new Product({
            name,
            description,
            price,
            brand,
            category,
            new_arrival,
            is_featured,
        });

       


    const {path,public_id}= await upload(product_image[0],uploadFolder);
      product.product_image={
        path,
        public_id,
      }


//Promise.all(arr_promise)   // all promise must be fulfilled
//Promise.all(arr_promise)    //all promise must be settled may or maynot be fulfilled
//Promise.race(arr_promise)   //gives result of first fulfilled promise
//Promise.any(arr_promise)

      if(images && images.length>0){
        const promises=images.map(file=>upload(file,uploadFolder)) 
            const files= await Promise.allSettled(promises);
            const fullFilled= files
            .filter(promise=>promise.status==='fulfilled')
            .map((img)=>img.value);
            product.set('images',fullFilled);
    }
    
    await product.save;
      //* Populate references
    await product.populate("brand");
    await product.populate("category");

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
    sendResponse(res,{
      message: "Product deleted successfully",
      statusCode:200,
      data: product,
});
  });


  //* get by category
  export const getByCategory = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params;
    const category= await Product.findOne({category:id}).populate("category");
    if(!category){
        throw new appError("Category ID not found",404);
    }
    
        sendResponse(res, {
            statusCode: 200,
            message: "Product fetched successfully",
            data: category,
        });
  })


  //* get by brand
    export const getByBrand = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params;
    const brand= await Product.findOne({brand:id}).populate("brand");
    if(!brand){
        throw new appError("Brand ID not found",404);
    }
    
        sendResponse(res, {
            statusCode: 200,
            message: "Product fetched successfully",
            data: brand,
        });
  })



  //* get new_arrival
  export const getNewArrivals = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const products = await Product.find()
            .sort({ createdAt: -1 }) // newest first
            .populate("brand")
            .populate("category");
        if (products.length === 0) {
            throw new appError("No products found", 404);
        }
        sendResponse(res, {
            statusCode: 200,
            message: "New arrivals fetched successfully",
            data: products,
        });
    }
);


  //* get featured
  export const getFeatured = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const products = await Product.find({
            isFeatured: true,
        })
            .populate("brand")
            .populate("category");

        if (products.length === 0) {
            throw new appError("No featured products found", 404);
        }
        sendResponse(res, {
            statusCode: 200,
            message: "Featured products fetched successfully",
            data: products,
        });
    }
);