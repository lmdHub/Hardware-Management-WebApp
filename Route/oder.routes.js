import { Router } from "express";
const OrderRouter = Router();

// GET /orders/ return all orders details
OrderRouter.get('/', (req, res) => {
    res.send({ title: 'All orders details' });
});

// GET /orders/:orderid return order details of a specific order by id
OrderRouter.get('/:orderid', (req, res) => {
    res.send({ title: 'Order details of a specific order by id' });
});

// POST /orders/ Create new order
OrderRouter.post('/', (req, res) => {
    res.send({ title: 'Order created' });
});

export default OrderRouter;