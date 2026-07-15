
import {z} from "zod";


//by default all the objects are required use .optional to make it optional
export const registerUserSchema=z.object({
    body:z.object({
        full_name: z
        .string("fullname must be string")
        .min(3,"fullname must be at least 3 character long")
        .max(50,"fullname must not exceed 50 characters "),
        email:z.email({
            error:(issue)=>
                issue.input === undefined 
            ? "email is required"
            :"invalid email format",
        }),
        password:z.
        string("password must br string")
        .min(6,"password must be at least 6 character long"),
    }),
    params:z.object({}).default({}),
    query: z.object({}).default({})
})


export const loginUserSchema=z.object({
    body:z.object({
          email:z.email({
            error:(issue)=>
                issue.input === undefined 
            ? "email is required"
            :"invalid email format",
        }),
        password:z.
        string("password must be string")
        .min(6,"password must be at least 6 character long"),
    })
})