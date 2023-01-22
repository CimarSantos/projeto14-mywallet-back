import { Router } from "express";
import { signIn_out, getEntries, deleteSigns } from "../controllers/User.js";
import validateInOut from "../middlewares/validateInOut.js";
import validateGetPosts from "../middlewares/validateGetPosts.js";
import validateDelete from "../middlewares/validateDelete.js";

const userRouter = Router();

userRouter.post("/newinout", validateInOut, signIn_out);
userRouter.get("/userinout", validateGetPosts, getEntries);
userRouter.delete("/deleteinput/:entryID", validateDelete, deleteSigns);

export default userRouter;
