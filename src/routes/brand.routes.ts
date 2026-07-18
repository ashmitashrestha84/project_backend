import express from "express";
import { getAll,getById,create,update,remove } from "../controllers/brand.controller";
import { uploader } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { All_Admin} from "../types/enumtypes";
import { validate } from "../middlewares/validator.middleware";
import { brandIdSchema, createBrandSchema, deleteBrandSchema, getBrandsSchema, updateBrandSchema } from "../validators/brand.validator";
const router=express.Router();

const upload=uploader();


router.get("/",validate(getBrandsSchema),getAll);
router.get("/:id",validate(brandIdSchema),getById);
router.post("/",upload.single("logo"),authenticate(All_Admin),validate(createBrandSchema),create);
router.put("/:id",upload.single("logo"),authenticate(All_Admin),validate(updateBrandSchema),update);
router.delete("/:id",authenticate(All_Admin),validate(deleteBrandSchema),remove);

export default router;