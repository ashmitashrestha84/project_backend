import express from "express";
import {
  addToWishlist,
  clearWishlist,
  removeWishlist,
  getWishlist,
} from "../controllers/wishlist.controller";
import { validate } from "../middlewares/validator.middleware";
import {
  createWishlistSchema,
  removeWishlistSchema,
} from "../validators/wishlist.validator";
import { authenticate } from "../middlewares/auth.middleware";
import { User_Only } from "../types/enumtypes";

const router = express.Router();

router.get("/", authenticate(User_Only ), getWishlist);

router.post(
  "/",
  authenticate(User_Only),
  validate(createWishlistSchema),
  addToWishlist,
);

router.delete("/", authenticate(User_Only ), clearWishlist);

router.delete(
  "/:id",
  authenticate(User_Only),
  validate(removeWishlistSchema),
  removeWishlist,
);

export default router;
