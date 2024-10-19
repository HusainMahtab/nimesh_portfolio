import { Router } from "express";
import { authorizedRole } from "../middlewares/verifyJWT.middleware.js";
import { authorizedUser } from "../middlewares/verifyJWT.middleware.js";
import { 
    createProject,
    updateProject,
    deleteProject,
    allProjects 
} from "../controllers/project.controller.js";
import upload from "../middlewares/upload.middleware.js";

const router=Router()

// create projects --->ADMIN
router.route("/createProject").post(authorizedUser,authorizedRole("ADMIN"),upload.single('projectPic'),createProject)
// update project --->ADMIN
router.route("/updateProject/:_id").put(authorizedUser,authorizedRole("ADMIN"),upload.single('projectPic'),updateProject)
// delete project  ---->ADMIN
router.route("/deleteProject/:_id").delete(authorizedUser,authorizedRole("ADMIN"),deleteProject)
// fetch all projects
router.route("/allProjects").get(allProjects)

export default router
