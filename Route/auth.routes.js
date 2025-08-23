import { Router } from "express";
const authRouter = Router();

// POST /auth/sign-up Create new user
authRouter.post('/sign-up', (req, res) => {
    res.send({ title: 'User signed up' });
});

// POST /auth/sign-in Sign in user
authRouter.post('/sign-in', (req, res) => {
    res.send({ title: 'User signed in' });
});

// POST /auth/sign-out Sign out user
authRouter.post('/sign-out', (req, res) => {
    res.send({ title: 'User signed out' });
});

export default authRouter;
