import express from "express"
import * as companyController from "../controllers/company.controller.js"
import isAuthenticated from "../middleware/user.middleware.js";
import { singleUpload } from "../middleware/multer.js";
const companyRouter = express.Router();

companyRouter.post("/register", isAuthenticated, companyController.registerCompany);
companyRouter.get("/get", isAuthenticated, companyController.getCompany);
companyRouter.get("/get/:id", isAuthenticated, companyController.getCompanyById);
companyRouter.put("/update/:id", isAuthenticated, singleUpload, companyController.updateCompany);

export default companyRouter;