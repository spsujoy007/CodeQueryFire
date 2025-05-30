import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
    EditPostController,
    HandleDeletePost,
    MyPostsController,
    post_Question, 
    SinglePostDetails, 
    ViewHomePosts
} from "../controllers/post.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

// routes 
router.route("/makepost").post(
    upload.array('images', 3), 
    verifyJWT, 
    post_Question
)
router.route("/viewposts").get( ViewHomePosts )
router.route("/myposts").get( verifyJWT, MyPostsController )
router.route("/post_details").get( SinglePostDetails )
router.route("/editpost").get( EditPostController )
router.route("/delete").delete( verifyJWT, HandleDeletePost )

export default router