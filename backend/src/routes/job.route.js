import express from "express"
import * as jobController from "../controllers/job.controller.js"
import isAuthenticated from "../middleware/user.middleware.js";
const jobRouter = express.Router();

jobRouter.post("/post",isAuthenticated,jobController.postJob);
jobRouter.get("/get",isAuthenticated,jobController.getAllJob);
jobRouter.get("/get/:id",isAuthenticated,jobController.getJobById);
jobRouter.get("/getadminjobs",isAuthenticated,jobController.getAdminJobs);

export default jobRouter;