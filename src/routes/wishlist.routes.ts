import express from "express";
import { addToWishlist, clearWishlist, deleteWishlist, getWishlist } from "../controllers/wishlist.controller";
import { validate } from "../middlewares/validator.middleware";
import { wishlistUserSchema } from "../validators/wishlist.validator";
import { authenticate } from "../middlewares/auth.middleware";
import { User_Only } from "../types/enumtypes";

const router=express.Router()

router.get("/",getWishlist)
router.post("/",authenticate(User_Only),validate(wishlistUserSchema),addToWishlist)
router.delete("/",clearWishlist)
router.delete("/:id",deleteWishlist)

export default router;