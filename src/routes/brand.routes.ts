import express from "express";
import { getAll,getById,create,update,remove } from "../controllers/brand.controller";
import { uploader } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";
const router=express.Router();

const upload=uploader();


router.get("/",authenticate(),getAll);
router.get("/:id",getById);
router.post("/",upload.single("logo"),create);
router.put("/:id",upload.single("logo"),update);
router.delete("/:id",remove);

export default router;