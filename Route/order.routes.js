import express from "express";
import { createOrder } from "../controllers/order.controller.js";

const router = express.Router();

// POST → /api/v1/orders/
router.post("/", createOrder);

export default router;
