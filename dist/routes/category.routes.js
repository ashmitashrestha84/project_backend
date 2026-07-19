"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const enumtypes_1 = require("../types/enumtypes");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const category__validator_1 = require("../validators/category. validator");
const router = express_1.default.Router();
const upload = (0, multer_middleware_1.uploader)();
//* get all category
router.get("/", (0, validator_middleware_1.validate)(category__validator_1.getCategoriesSchema), category_controller_1.getAll);
//* get by id
router.get("/:id", (0, validator_middleware_1.validate)(category__validator_1.categoryIdSchema), category_controller_1.getById);
//* create/post
router.post("/", upload.single("logo"), (0, auth_middleware_1.authenticate)(enumtypes_1.All_Admin), (0, validator_middleware_1.validate)(category__validator_1.createCategorySchema), category_controller_1.create);
//* update/put
router.put("/:id", upload.single("logo"), (0, auth_middleware_1.authenticate)(enumtypes_1.All_Admin), (0, validator_middleware_1.validate)(category__validator_1.updateCategorySchema), category_controller_1.update);
//* delete
router.delete("/:id", (0, auth_middleware_1.authenticate)(enumtypes_1.All_Admin), (0, validator_middleware_1.validate)(category__validator_1.deleteCategorySchema), category_controller_1.remove);
exports.default = router;
