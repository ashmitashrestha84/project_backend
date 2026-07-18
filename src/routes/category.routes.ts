import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/category.controller";
import { uploader } from "../middlewares/multer.middleware";
import { All_Admin} from "../types/enumtypes";
import { authenticate } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validator.middleware";
import { categoryUserSchema } from "../validators/category. validator";

const router = express.Router();
const upload=uploader();

//* get all category
router.get("/", getAll);

//* get by id
router.get("/:id", getById);

//* create/post
router.post("/",upload.single("logo"),authenticate(All_Admin),validate(categoryUserSchema),create);

//* update/put
router.put("/:id",upload.single("logo"),authenticate(All_Admin),validate(categoryUserSchema),update);

//* delete
router.delete("/:id",authenticate(All_Admin),remove);

export default router;
