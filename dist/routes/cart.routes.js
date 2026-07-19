"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("../controllers/cart.controller");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const cart_validator_1 = require("../validators/cart.validator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enumtypes_1 = require("../types/enumtypes");
const router = express_1.default.Router();
router.get("/", cart_controller_1.getCart);
router.post("/", (0, auth_middleware_1.authenticate)(enumtypes_1.User_Only), (0, validator_middleware_1.validate)(cart_validator_1.CreateCartSchema), cart_controller_1.create);
router.put("/:id", (0, auth_middleware_1.authenticate)(enumtypes_1.User_Only), (0, validator_middleware_1.validate)(cart_validator_1.UpdateCartSchema), cart_controller_1.updateCart);
router.delete("/", cart_controller_1.clearCart);
router.delete("/:id", (0, validator_middleware_1.validate)(cart_validator_1.removeCartSchema), cart_controller_1.removeCart);
exports.default = router;
