import express from "express";
import Inventory from "../Models/inventory.model.js";

const inventoryRouter = express.Router();

// GET all inventory items
inventoryRouter.get('/', async (req, res, next) => {
    try {
        const items = await Inventory.find({});
        res.json({ success: true, data: items });
    } catch (error) {
        next(error);
    }
});

// GET inventory item by id
inventoryRouter.get('/:hardwareid', async (req, res, next) => {
    try {
        const item = await Inventory.findById(req.params.hardwareid);
        if (!item) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }
        res.json({ success: true, data: item });
    } catch (error) {
        next(error);
    }
});

// POST create new inventory item
inventoryRouter.post('/', async (req, res, next) => {
    try {
        const { name, quantity } = req.body;
        const item = new Inventory({ name, quantity });
        await item.save();
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        next(error);
    }
});

export default inventoryRouter;
