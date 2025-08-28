console.log('server running - Hello worl');

import express from "express";
import cookieParser from "cookie-parser";

import { PORT } from "./Config/env.js";

import authRouter from "./Route/auth.routes.js";
import inventoryRouter from "./Route/inventory.routes.js";
import orderRouter from "./Route/order.routes.js";
import subscriptionsRouter from "./Route/subscription.route.js";
import userRouter from "./Route/user.routes.js";

import connectDB from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Middleware to parse JSON bodies

app.use('/api/v1/auth', authRouter); // get to signup page by hitting /api/v1/auth/signup
app.use('/api/v1/users', userRouter); // get to users page by hitting /api/v1/users
app.use('/api/v1/inventories', inventoryRouter); // get to inventory page by hitting /api/v1/inventory
app.use('/api/v1/orders', orderRouter); // get to orders page by hitting /api/v1/orders
app.use('/api/v1/subscriptions', subscriptionsRouter); // get to subscriptions page by hitting /api/v1/subscriptions

app.use(errorMiddleware);


app.get('/', (req,res) => {
    res.send('Welcome to Hardware management System');
});

app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    await connectDB();
});

export default app;
