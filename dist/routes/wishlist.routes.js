"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishlist_controller_1 = require("../controllers/wishlist.controller");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const wishlist_validator_1 = require("../validators/wishlist.validator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enumtypes_1 = require("../types/enumtypes");
const router = express_1.default.Router();
router.get("/", wishlist_controller_1.getWishlist);
router.post("/", (0, auth_middleware_1.authenticate)(enumtypes_1.User_Only), (0, validator_middleware_1.validate)(wishlist_validator_1.createWishlistSchema), wishlist_controller_1.addToWishlist);
router.delete("/", wishlist_controller_1.clearWishlist);
router.delete("/:id", (0, validator_middleware_1.validate)(wishlist_validator_1.removeWishlistSchema), wishlist_controller_1.removeWishlist);
exports.default = router;
