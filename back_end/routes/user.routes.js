import {Router} from "express"
import upload from "../middlewares/upload.middleware.js"
import { 
    signUp,
    login_user,
    profileDetails,
    logout,
    allUsers,
    uploadResume,
    downloadResume
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
// In your route handler
router.route("/upload-resume/:_id")
    .post(upload.single('resume'), (err, req, res, next) => {
        // if (err instanceof multer.MulterError) {
        //     return res.status(400).json({ error: err.message });
        // } else if (err) {
        //     return res.status(400).json({ error: err.message });
        // }
        next();
    }, uploadResume);
// In your userRoutes.js
router.route("/download-resume/:_id").get(authorizedUser,downloadResume);
  

export {router}