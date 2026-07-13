//* 1. login/authentication
//* 2. authorized 

import { NextFunction, Request, Response } from "express"
import { Role } from "../types/enumtypes";
import appError from "../utils/appError.utils";
import { verifyJwtToken } from "../utils/jwt.utils";
import ENV_CONFIG from "../config/env.config";


export const authenticate=(role?:Role[])=>{
    return (req:Request, res:Response, next:NextFunction) =>{
        try{
            //* 1. get access_token
            //method of accessing token
            //Authorization headers/cookies
            //browser has three storage->local(permanent as cookies but less secure),
            // cookies(more secure to store token and permanent kindof),session(for a particular session)
            
            const cookies=req.cookies;
            const access_token=cookies["access_token"];
            console.log(access_token);
            
            if(!access_token){
                throw new appError("Unauthorized.Login required",401);
            }
        
            //* 2. verify access_token
            const decoded_data=verifyJwtToken(access_token);
            if(!decoded_data){
                throw new appError("Invalid token. Login required",401);
            }
            console.log(decoded_data);


            //* 3. check token expiry
            if(decoded_data.exp*1000 < Date.now()){
                res.clearCookie("access_token",{
                         httpOnly:ENV_CONFIG.NODE_ENV==="development" ? false:true,  //production->true  development->false
                          secure:ENV_CONFIG.NODE_ENV==="development" ? false:true,
                          maxAge: 7 * 24 * 60 * 60 * 1000,
                          sameSite:ENV_CONFIG.NODE_ENV==="development" ? "lax":"none", 
                });
                throw new appError("Token expired.Access Denied",401);
            }
            
            //* 4. check role
            if(role && role.length>0 && !role.includes(decoded_data.role)){
                throw new appError("unauthorized.Access denied",401);
            }
            req.user={
                _id:decoded_data._id,
                email:decoded_data.email,
                role:decoded_data.role,
            }

            next();
        }catch(error){
            next(error);
        }
    }
}