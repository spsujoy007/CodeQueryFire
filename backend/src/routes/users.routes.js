import { Router } from "express"
import { changePassword, editUserProfile, handleAddSocialLinks, handleRemoveSocialLink, loggedInProfile, loginUser, logoutUserControl, registerUser, updateUserAvatar } from "../controllers/user.controllers.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()
// ================================
// 🚀 Public Routes (No Authentication Required)
// ================================

// 📝 User Registration Route
router.route("/register").post(registerUser);

// 🔐 User Login Route
router.route("/login").post(loginUser);


// ================================
// 🔒 Protected Routes (Require Authentication)
// ================================

// 🔄 Change Password (Authenticated Users Only)
router.route("/change-password").post(verifyJWT, changePassword);

// 🏠 Get Logged-in User Profile
router.route("/loggedin-profile").get(verifyJWT, loggedInProfile);

// 🛠️ Edit User Profile
router.route("/edit_profile").post(verifyJWT, editUserProfile);

// 🚪 Logout User
router.route("/logout_user").get(verifyJWT, logoutUserControl);

// 🌐 Add Social Links to Profile
router.route("/add_social_link").post(verifyJWT, handleAddSocialLinks);

router.route("/remove_social_link").delete(verifyJWT, handleRemoveSocialLink)

// 🖼️ Update User Avatar (Requires Authentication & File Upload)
router.route("/update_avatar").patch(
    upload.fields([{ name: "avatar", maxCount: 1 }]), 
    verifyJWT, 
    updateUserAvatar
);


export default router