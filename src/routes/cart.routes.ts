

import express from "express";
import { clearCart, create, deleteCart, getCart, updateCart } from "../controllers/cart.controller";
import { validate } from "../middlewares/validator.middleware";
import { CreateCartSchema, deleteCartSchema, UpdateCartSchema } from "../validators/cart.validator";
import { authenticate } from "../middlewares/auth.middleware";
import {  User_Only } from "../types/enumtypes";

const router=express.Router();

router.get("/",getCart);
router.post("/", authenticate(User_Only),validate(CreateCartSchema),create);
router.put("/:id",authenticate(User_Only),validate(UpdateCartSchema),updateCart);
router.delete("/",clearCart);
router.delete("/:id",validate(deleteCartSchema),deleteCart);

export default router;
