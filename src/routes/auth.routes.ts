import express from "express";
import { register,login } from "../controllers/auth.controller";

const router = express.Router();

//* register
router.post("/register", register);

//* login
router.post("/login",login);

//* get profile

//* change password

//* forgot password

//* change mail

export default router;
