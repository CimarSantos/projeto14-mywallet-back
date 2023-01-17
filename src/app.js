import express from "express";
import cors from "cors";
import chalk from "chalk";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(5000, () =>
  console.log(chalk.blueBright("Server running on port 5000"))
);
