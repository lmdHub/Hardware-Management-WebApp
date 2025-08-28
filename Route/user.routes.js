import { Router } from "express";
import { getUsers, getUser} from "../controllers/user.controller.js";
import authororize from "../middleware/auth.middleware.js";

const userRouter = Router();

// GET /users/ reurn all users details
userRouter.get('/',getUsers);

// GET /:id reurn user details a specific user by id
userRouter.get('/:id', authororize, getUser);

// POST / Create new user
userRouter.post('/', (req, res) => {
    res.json({ title: 'User Created' });
});

// POST /:id Update user details of a specific user by id
userRouter.post('/:id', (req, res) => {
    res.json({ title: 'User profile updated' });
});

// DELETE /:id Delete a specific user by id
userRouter.delete('/:d', (req, res) => {
    res.json({ title: 'User profile deleted' });
});

export default userRouter;
