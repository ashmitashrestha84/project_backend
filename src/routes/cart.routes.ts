

import express from "express";
import { clearCart, create, deleteCart, getCart, updateCart } from "../controllers/cart.controller";
import { validate } from "../middlewares/validator.middleware";
import { cartUserSchema } from "../validators/cart.validator";
import { authenticate } from "../middlewares/auth.middleware";
import {  User_Only } from "../types/enumtypes";

const router=express.Router();

router.get("/",getCart);
router.post("/", authenticate(User_Only),validate(cartUserSchema),create);
router.put("/:id",authenticate(User_Only),validate(cartUserSchema),updateCart);
router.delete("/:id",clearCart);
router.delete("/:id",deleteCart);

export default router;
