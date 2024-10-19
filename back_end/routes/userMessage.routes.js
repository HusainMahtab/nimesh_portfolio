import { Router } from "express";
import { sendMessage,allUsersMessage,deleteMessages } from "../controllers/userMessage.controller.js";
import { authorizedRole, authorizedUser } from "../middlewares/verifyJWT.middleware.js";

const router=Router()

// send message to developer
router.route("/send_message").post(sendMessage)
// get all user's message  --->ADMIN
router.route("/all_messsages").get(authorizedUser,authorizedRole("ADMIN"),allUsersMessage)
// delete message  --->ADMIN
router.route("/delete_message/:_id").delete(authorizedUser,authorizedRole("ADMIN"),deleteMessages)


export default router