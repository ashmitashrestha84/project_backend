import express from "express";
import { getAll,getAllAdmins,getbyId } from "../controllers/user.controller"
import { authenticate } from "../middlewares/auth.middleware";
import { All_Admin } from "../types/enumtypes";
import { validate } from "../middlewares/validator.middleware";
import { userIdSchema } from "../validators/user.validator";

const router=express.Router();

router.get("/",getAll);
router.get("/admins",authenticate(All_Admin),getAllAdmins);
router.get("/:id",validate(userIdSchema),getbyId);

export default router;