"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const product_validator_1 = require("../validators/product.validator");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enumtypes_1 = require("../types/enumtypes");
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.uploader)();
router.get("/", (0, validator_middleware_1.validate)(product_validator_1.getProductsSchema), product_controller_1.getAll);
router.get("/categories/:id", (0, validator_middleware_1.validate)(product_validator_1.productCategorySchema), product_controller_1.getByCategory);
router.get("/brands/:id", (0, validator_middleware_1.validate)(product_validator_1.productBrandSchema), product_controller_1.getByBrand);
router.get("/newarrivals", product_controller_1.getNewArrivals);
router.get("/featured", product_controller_1.getFeatured);
router.get("/:id", (0, validator_middleware_1.validate)(product_validator_1.productIdSchema), product_controller_1.getById);
router.post("/", upload.fields([{
        name: "product_image",
        maxCount: 1,
    },
    {
        name: "images",
        maxCount: 5,
    }
]), (0, auth_middleware_1.authenticate)(enumtypes_1.All_Admin), (0, validator_middleware_1.validate)(product_validator_1.createProductSchema), product_controller_1.create);
router.put("/:id", upload.fields([
    {
        name: "product_image",
        maxCount: 1,
    },
    {
        name: "images",
        maxCount: 5,
    },
]), (0, auth_middleware_1.authenticate)(enumtypes_1.All_Admin), (0, validator_middleware_1.validate)(product_validator_1.updateProductSchema), product_controller_1.update);
router.delete("/:id", product_controller_1.remove);
exports.default = router;
