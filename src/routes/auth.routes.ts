import express from "express";
import { register,login, changeProfileImage } from "../controllers/auth.controller";
import { uploader } from "../middlewares/multer.middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

const upload= uploader();

//* register
router.post("/register",upload.single("profile_image"), register);

//* login
router.post("/login",login);


//* get profile
//router.get("/me",profile)

//* change profile_Image
router.post("/profile-image",upload.single("profile_image"),authenticate(),changeProfileImage);

//*logout
//router.post("/logout",logout)

//* change password

//* forgot password

//* change mail

export default router;
