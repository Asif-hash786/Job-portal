import cookieParser from "cookie-parser";
import express, { urlencoded } from "express"
import cors from "cors";
import userRouter from "./routes/user.route.js";
import companyRouter from "./routes/company.route.js";
import jobRouter from "./routes/job.route.js";
import applicationRouter from "./routes/application.route.js";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))


app.get("/api/v1/test", (req, res) => {
  res.json({ message: "Backend working" });
});

app.use("/api/v1",userRouter);
app.use("/api/v1/company",companyRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/application",applicationRouter);

export default app;