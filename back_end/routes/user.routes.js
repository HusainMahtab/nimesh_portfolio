import {Router} from "express"
import upload from "../middlewares/upload.middleware.js"
import { 
    signUp,
    login_user,
    profileDetails,
    logout,
    allUsers 
} from "../controllers/user.controller.js"
import { authorizedRole } from "../middlewares/verifyJWT.middleware.js"
import { authorizedUser } from "../middlewares/verifyJWT.middleware.js"
const router=Router()

// sign up users
router.route("/signup").post(upload.single('profilePic'), (req, res, next) => {
    console.log('File:', req.file);  // Log file details
    console.log('Body:', req.body);  // Log body data
    next();  // Pass to the signUp controller
}, signUp);
// login users
router.route("/login").post(login_user)
// users profile
router.route("/profile").get(authorizedUser,profileDetails)
// logout user
router.route("/logout").post(authorizedUser,logout)
//get all users ---->ADMIN
router.route("/allusers").get(authorizedUser,authorizedRole("ADMIN"),allUsers)

export {router}