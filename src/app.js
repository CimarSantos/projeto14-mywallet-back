import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import AuthRouter from "./routers/AuthRoutes.js";
import userRouter from "./routers/userRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(AuthRouter);
app.use(userRouter);

app.listen(process.env.PORT, () =>
  console.log(chalk.blueBright("Server running on port 5000"))
);
