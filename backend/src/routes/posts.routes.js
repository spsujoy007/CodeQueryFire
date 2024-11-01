import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    post_Question 
} from "../controllers/post.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

// routes 
router.route("/makepost").post(upload.array('images', 3), verifyJWT, post_Question)

export default router