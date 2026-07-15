import express from "express";
import { getAll,getById,create,update,remove } from "../controllers/brand.controller";
import { uploader } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { All_Admin} from "../types/enumtypes";
const router=express.Router();

const upload=uploader();


router.get("/",getAll);
router.get("/:id",getById);
router.post("/",upload.single("logo"),authenticate(All_Admin),create);
router.put("/:id",upload.single("logo"),authenticate(All_Admin),update);
router.delete("/:id",authenticate(All_Admin),remove);

export default router;