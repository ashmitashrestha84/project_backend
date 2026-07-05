import express from "express";
import { getAll,getAllAdmins,getbyId } from "../controllers/user.controller"

const router=express.Router();

router.get("/",getAll);
router.get("/admins",getAllAdmins);
router.get("/:id",getbyId);

export default router;