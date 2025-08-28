import { Router } from "express";
import { signIn, signUp, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();

// Route to create a new user account
// POST /auth/sign-up full path will be /api/v1/auth/sign-up
authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);

export default authRouter;
