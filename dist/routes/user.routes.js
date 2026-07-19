"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const enumtypes_1 = require("../types/enumtypes");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const user_validator_1 = require("../validators/user.validator");
const router = express_1.default.Router();
router.get("/", user_controller_1.getAll);
router.get("/admins", (0, auth_middleware_1.authenticate)(enumtypes_1.All_Admin), user_controller_1.getAllAdmins);
router.get("/:id", (0, validator_middleware_1.validate)(user_validator_1.userIdSchema), user_controller_1.getbyId);
exports.default = router;
