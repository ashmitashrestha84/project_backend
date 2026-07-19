"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
//by default all the objects are required use .optional to make it optional
exports.registerUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        full_name: zod_1.z
            .string("fullname must be string")
            .min(3, "fullname must be at least 3 character long")
            .max(50, "fullname must not exceed 50 characters "),
        email: zod_1.z.email({
            error: (issue) => issue.input === undefined
                ? "email is required"
                : "invalid email format",
        }),
        password: zod_1.z.
            string("password must br string")
            .min(6, "password must be at least 6 character long"),
    }),
    params: zod_1.z.object({}).default({}),
    query: zod_1.z.object({}).default({})
});
exports.loginUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.email({
            error: (issue) => issue.input === undefined
                ? "email is required"
                : "invalid email format",
        }),
        password: zod_1.z.
            string("password must be string")
            .min(6, "password must be at least 6 character long"),
    })
});
