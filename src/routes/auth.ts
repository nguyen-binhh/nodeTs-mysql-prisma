import { Router } from "express";
import { login, signup } from "../controllers/auth";
import { errorHandle } from "../error-handle";

const authRoutes:Router = Router();

authRoutes.post("/signup", errorHandle(signup));
authRoutes.post("/login", errorHandle(login));

export default authRoutes;
