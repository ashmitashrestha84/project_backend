//* 1. login/authentication
//* 2. authorized 

import { NextFunction, Request, Response } from "express"


export const authenticate=()=>{
    return (req:Request, res:Response, next:NextFunction) =>{
        try{
            //* 1. get access_token
            //method of accessing token
            //Authorization headers/cookies
            //brower has three storage->local(permanent as cookies but less secure),
            // cookies(more secure to store token and permanent kindof),session(for a particular session)
            //* 2. verify access_token
            //* 3. check token expiry
            //* 4. check role

            next();
        }catch(error){
            next(error);
        }
    }
}