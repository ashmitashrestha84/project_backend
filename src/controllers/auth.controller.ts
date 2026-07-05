import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import { comparePassword, hashPassword } from "../utils/bcrypt.utlis";
import appError from "../utils/appError.utils";

//*  register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { full_name, email, password, phone } = req.body;
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
    //!save user
    await user.save();

    //* success response
    res.status(201).json({
      message: "Account registered",
      success: true,
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//* login

export const login=async(req:Request,res:Response,next:NextFunction)=>{
  try{
    const {email,password}=req.body;
    if(!email) throw new appError("Email is required",400);
    if(!password) throw new appError("password is required",400);

    const user=await User.findOne({email:email});
    if(!user){
      throw new appError("credentials doesnot match",400);
    }

    //* compare password
    const isPassmatched=await comparePassword(password,user.password);
    if(!isPassmatched){
      throw new appError("credentials not matched",400);
    }
  //* success response

  res.status(201).json({
    message:"login success",
    status:"success",
    success:true,
    data:user
  })
}
  catch(error){
    next(error);
  }
}

//* get profile

//* change password

//* forgot password

//* change mail
