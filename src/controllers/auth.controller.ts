import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt.utlis";
import appError from "../utils/appError.utils";
import { catchAsync } from "../utils/catchAsync.utils";
import { deleteFile, upload } from "../utils/cloudinary.utlis";
import { generateJwtToken } from "../utils/jwt.utils";
import { IJwtPayload } from "../types/globaltypes";
import ENV_CONFIG from "../config/env.config";
import { sendResponse } from "../utils/sendResponse.utlis";

const uploadFolder="/profile_images";

//*  register
//create
export const register = catchAsync(async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    const { full_name, email, password, phone } = req.body;
    const file=req.file;
    console.log(file);
    if (!full_name) {
    //   const error: any = new Error("fullname is required");
    //   error.StatusCode = 404;
    //   error.Status = "fail";
    //   throw error;
    throw new appError('full_name is required',400); 
    }
    if (!email) throw new appError('email is required',400);
    if (!password) {
    throw new appError('password is required',400);
    }
    const user = new User({ email, password, full_name, phone }); //create user

    //* hash password
    const hashPass = await hashPassword(password);
    user.password = hashPass;

    //* handle profile image
    if(file){
      //* upload to clodinary
      const {path,public_id} = await upload(file,uploadFolder);

      user.profile_image={
        path,
        public_id,
      }

    }
    //!save user
    await user.save();

    //* converting mongoose doc to js object
    const {password:user_pass,...rest}=user.toObject();

    //* success response
    sendResponse(res,{
      message:"Account created",
      statusCode:201,
      data:rest,
    })
});

//* login
export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // email , password
    const { email, password } = req.body;
    if (!email) {
      throw new appError("email is required", 400);
    }
    if (!password) {
      throw new appError("password is required", 400);
    }
    //* find user by email
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      throw new appError("credentials does not matched", 400);
    }
    //* compare password
    const isPassMatched = await comparePassword(password, user.password);

    if (!isPassMatched) {
      throw new appError("credentials does not matched", 400);
    }
    //* jwt token
    const payload:IJwtPayload={
      _id:user._id,
      email:user.email,
      role:user.role,
    }
    const access_token=generateJwtToken(payload)
    res.cookie('access_token',access_token,{
      httpOnly:ENV_CONFIG.NODE_ENV==="development" ? false:true,  //production->true  development->false
      secure:ENV_CONFIG.NODE_ENV==="development" ? false:true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite:ENV_CONFIG.NODE_ENV==="development" ? "lax":"none",   //production->none    
    })



      const {password:p, ...rest}=user.toObject();
  //* success response

    sendResponse(res, {
      statusCode: 200,
      message: "Login User",
      data: {
        user:rest,
        access_token,
      },
    });
  // res.status(201).json({
  //   message:"login success",
  //   status:"success",
  //   success:true,
  //   data:{
  //     user,
  //     access_token,
  //   }
  // })
})


//* logout

//* get profile

//* change profile image
export const changeProfileImage= catchAsync(async(req: Request,res:Response,next:NextFunction)=>{
    const {_id}=req.user;
    const file=req.file;
    if(!file){
      throw new appError("profile_image is required",400);
    }
    const user = await User.findOne({_id:_id});
    if(!user){
      throw new appError("Profile not found",400);
    }

    //!delete old Image
   if(user.profile_image && user.profile_image.public_id){
     await deleteFile(user.profile_image.public_id);
   }

    const {path, public_id}= await upload(file,uploadFolder);
    user.profile_image={
      path,
      public_id,
    }

    //* send success response
    sendResponse(res,{
      message:"Profile Image updated",
      statusCode:200,
      data:user,
    })

})

//* change password

//* forgot password

//* change mail
