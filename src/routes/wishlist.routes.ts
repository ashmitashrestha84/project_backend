import express from "express";
import { addToWishlist, clearWishlist, deleteWishlist, getWishlist } from "../controllers/wishlist.controller";

const router=express.Router()

router.get("/",getWishlist)
router.post("/",addToWishlist)
router.delete("/:id",clearWishlist)
router.delete("/:id",deleteWishlist)

export default router;