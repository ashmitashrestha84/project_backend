import express from "express";
import { getAll,getById,create,update,remove, getByBrand, getFeatured, getNewArrivals, getByCategory } from "../controllers/product.controller";
import { uploader } from "../middlewares/multer.middleware";
import { validate } from "../middlewares/validator.middleware";
import { createProductSchema, getProductsSchema, productBrandSchema, productCategorySchema, productIdSchema, updateProductSchema } from "../validators/product.validator";
import { authenticate } from "../middlewares/auth.middleware";
import { All_Admin } from "../types/enumtypes";


const router=express.Router();
const upload=uploader()

router.get("/", validate(getProductsSchema),getAll);
router.get("/categories/:id",validate(productCategorySchema),getByCategory);
router.get("/brands/:id",validate(productBrandSchema) ,getByBrand);
router.get("/newarrivals", getNewArrivals);
router.get("/featured", getFeatured);
router.get("/:id",validate(productIdSchema), getById);


router.post("/",upload.fields([{
        name:"product_image",
        maxCount:1,
    },
    {
        name:"images",
        maxCount:5,
    }
]),authenticate(All_Admin),validate(createProductSchema),create);

router.put(
  "/:id",
  upload.fields([
    {
      name: "product_image",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  authenticate(All_Admin),validate(updateProductSchema),update);
router.delete("/:id",remove);

export default router;
