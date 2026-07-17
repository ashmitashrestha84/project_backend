import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse.utlis";
import { catchAsync } from "../utils/catchAsync.utils";
import Product from "../models/product.model";
import appError from "../utils/appError.utils";
import { deleteFile, upload } from "../utils/cloudinary.utlis";




const uploadFolder="/products";


//* getall
export const getAll=catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    
      const { query ,category,brand,minPrice, maxPrice} = req.query;

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

    //* category
    if(category){
        filter.category=category;
    }
    if(brand){
        filter.brand=brand;
    }

    //* price range
    if(minPrice || maxPrice){
        const low=Number(minPrice);
        const high=Number(maxPrice);
        console.log(low,high)
        
        if(low){
            filter.price={
                $gte:low,
            }
        }
        if(high){
            filter.price={
                $lte:high,
            }
        }
        if(low && high){
            filter.price={
                $lte:high,
                $gte:low,
            };
        }
    }
    console.log(maxPrice);
    const product = await Product.find(filter)
  .populate("brand")
  .populate("category");

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
    
    await product.save();
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
     const {product_image,images}=req.files as {
        product_image?:Express.Multer.File[],
        images?: Express.Multer.File[],
    };
    const {id}=req.params;
    const {name,price,description,category,brand,is_featured,new_arrival,deleted_images}=req.body;

    const product=await Product.findOne({_id:id})

    if(!product ) throw new appError("Product is required",404);

    if (name) product.name = name;
    if (description) product.description = description;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (price) product.price = price;
    if (new_arrival) product.new_arrival = new_arrival;
    if (is_featured) product.is_featured = is_featured;

    
    if(product_image && product_image[0]){
        deleteFile(product.product_image.public_id);
        const {path, public_id}= await upload(product_image[0],uploadFolder);
        product.product_image={
            path,
            public_id,
        }
    } 
//* if deleted images
  if (
    deleted_images &&
    Array.isArray(deleted_images) &&
    deleted_images.length > 0
  ) 
  { //* delete from cloudinary
    Promise.allSettled(
      deleted_images.map((public_id) => deleteFile(public_id)),  
    );

    //* remaining images
    product.images = product.images.filter(
      (img) => !deleted_images.includes(img.public_id.toString()),
    ) as any;
  }

  //* if new images
  if (images && images.length > 0) {
    // [{status:'',value:{path,public_id}}]
    const files = await Promise.allSettled(
      images.map((file) => upload(file, uploadFolder)),
    );

    const newImages = files
      .filter((file) => file.status === "fulfilled")
      .map((file) => file.value);
    product.set("images", [...product.images, ...newImages]);
  }

   
    //* save product
    await product.save();

    //* send successful response
    sendResponse(res, {
        message: `product:${id} updated`,
        data: product,
        statusCode: 200,
    });
});


//* Delete
export const remove = catchAsync(async (req: Request,res: Response,next: NextFunction) => {
    const {id} = req.params;
    const product = await Product.findOneAndDelete({_id:id});
    if (!product) throw new appError("Product not found", 404);
    
    //* delete cover image
        deleteFile(product.product_image.public_id);



    //* delete images
    if(product.images && product.images.length>0){
        Promise.allSettled(product.images.map((img)=>deleteFile(img.public_id)));
    }

    //* delete product

    await product.save();

    sendResponse(res,{
      message: "Product deleted successfully",
      statusCode:200,
      data: product,
});
  });



  //* get by category
  export const getByCategory = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const {id}=req.params;
    const category= await Product.find({category:id}).populate("category");
    if(category.length===0){
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
    const brand= await Product.find({brand:id}).populate("brand");
    if(brand.length===0){
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
            is_featured: true,
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