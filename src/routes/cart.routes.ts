

import express from "express";
import { clearCart, create, deleteCart, getCart, updateCart } from "../controllers/cart.controller";
import { validate } from "../middlewares/validator.middleware";
import { cartUserSchema } from "../validators/cart.validator";

const router=express.Router();

router.get("/",getCart);
router.post("/",validate(cartUserSchema),create);
router.put("/:id",updateCart);
router.delete("/:id",clearCart);
router.delete("/:id",deleteCart);

export default router;
