import { Router } from "express";
import { signIn, signUp } from "../controllers/Auth.js";
import validateSignUp from "../middlewares/validadeSignUp.js";
import validateSignIn from "../middlewares/validateSignIn.js";

const authRouter = Router();

authRouter.post("/signIn", validateSignIn, signIn);
authRouter.post("/signUp", validateSignUp, signUp);

export default authRouter;
