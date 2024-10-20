import { Router } from "express"
import { changePassword, loggedInProfile, loginUser, registerUser } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// protected routes 
router.route("/change-password").post(verifyJWT, changePassword)
router.route("/loggedin-profile").get(verifyJWT, loggedInProfile)

export default router