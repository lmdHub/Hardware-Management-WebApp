import { Router } from "express";
const InventoryRouter = Router();

// GET /inventory/ return all inventory details
InventoryRouter.get('/', (req, res) => {
    res.json({ title: 'All inventory details' });
});

// GET /inventory/:hardwareid return inventory details of a specific hardware by id
InventoryRouter.get('/:hardwareid', (req, res) => {
    res.json({ title: 'Inventory details of a specific hardware by id' });
});

// POST /inventory/ Create new inventory item
InventoryRouter.post('/', (req, res) => {
    res.json({ title: 'Inventory item created' });
});

export default InventoryRouter;
