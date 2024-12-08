import { Router } from "express"
import { changePassword, editUserProfile, loggedInProfile, loginUser, logoutUserControl, registerUser, updateUserAvatar } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// protected routes 
router.route("/change-password").post(verifyJWT, changePassword)
router.route("/loggedin-profile").get(verifyJWT, loggedInProfile)
router.route("/edit_profile").post(verifyJWT, editUserProfile)
router.route("/logout_user").get(verifyJWT, logoutUserControl)

router.route("/update_avatar").patch(upload.fields([
    {
        name: "avatar",
        maxCount: 1
    }
]), verifyJWT, updateUserAvatar)

export default router