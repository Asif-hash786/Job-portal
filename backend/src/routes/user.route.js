import express from "express"
import * as userController from "../controllers/user.controller.js"
import isAuthenticated from "../middleware/user.middleware.js";
import { singleUpload } from "../middleware/multer.js";
const userRouter = express.Router();

userRouter.post("/register",singleUpload,userController.register);
userRouter.post("/login",userController.login);
userRouter.get("/logout",userController.logout);
userRouter.post("/profile/update",singleUpload,isAuthenticated,userController.updateProfile);

export default userRouter