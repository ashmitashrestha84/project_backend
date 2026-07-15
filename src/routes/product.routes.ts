import express from "express";
import { getAll,getById,create,update,remove, getByBrand, getFeatured, getNewArrivals, getByCategory } from "../controllers/product.controller";
import { uploader } from "../middlewares/multer.middleware";
import { validate } from "../middlewares/validator.middleware";
import { productValidateSchema } from "../validators/product.validator";
import { authenticate } from "../middlewares/auth.middleware";
import { All_Admin } from "../types/enumtypes";


const router=express.Router();
const upload=uploader()

router.get("/",getAll);
router.get("/:id",getById);
router.get("/categories/:id",getByCategory);
router.get("/brands/:id",getByBrand);
router.get("/newarrivals",getNewArrivals);
router.get("/featured",getFeatured);


router.post("/",upload.fields([{
        name:"product_image",
        maxCount:1,
    },
    {
        name:"images",
        maxCount:5,
    }
]),authenticate(All_Admin),validate(productValidateSchema),create);

router.put("/:id",update);
router.delete("/:id",remove);

export default router;
