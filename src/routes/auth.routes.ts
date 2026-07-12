import express from "express";
import { register,login, changeProfileImage } from "../controllers/auth.controller";
import { uploader } from "../middlewares/multer.middleware";

const router = express.Router();

const upload= uploader();

//* register
router.post("/register",upload.single("profile_image"), register);

//* login
router.post("/login",login);


//* get profile

//* change profile_Image
router.post("/change_profile_image",changeProfileImage);

//* change password

//* forgot password

//* change mail

export default router;
