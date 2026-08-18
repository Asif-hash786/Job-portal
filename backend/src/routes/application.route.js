import express from "express"
import * as applicationController from "../controllers/application.controller.js"
import isAuthenticated from "../middleware/user.middleware.js";
const applicationRouter = express.Router();

applicationRouter.get("/apply/:id",isAuthenticated,applicationController.applyJob);
applicationRouter.get("/get",isAuthenticated,applicationController.getApplyJob);
applicationRouter.get("/:id/applicants",isAuthenticated,applicationController.getApllicants);
applicationRouter.post("/status/:id/update",isAuthenticated,applicationController.updateStatus);

export default applicationRouter;