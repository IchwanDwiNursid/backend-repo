import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { router } from "../routes/userRoutes";
import { errorMiddleware } from "../middleware/errorMiddleware";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(router);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Backend Run On Port ${process.env.PORT}`);
});
