import e, { Router } from "express";
const subscriptionsRouter = Router();

// GET /subscriptions/ return all subscriptions details
subscriptionsRouter.post('/', (req, res) => {
    res.send({ title: 'All subscriptions details' });
});

// GET /subscriptions/:id return subscription details of a specific subscription by id
subscriptionsRouter.get('/:id', (req, res) => {
    res.send({ title: 'Subscription details of a specific subscription by id' });
});
// POST /subscriptions/ Create new subscription
subscriptionsRouter.post('/', (req, res) => {
    res.send({ title: 'Subscription created' });
});

// UPDATE /subscriptions/:id Update subscription details of a specific subscription by id
subscriptionsRouter.post('/:id', (req, res) => {
    res.send({ title: 'Subscription updated' });
});

// DELETE /subscriptions/:id Delete a specific subscription by id
subscriptionsRouter.delete('/:id', (req, res) => {
    res.send({ title: 'Subscription deleted' });
});

// GET /subscriptions/user/:userid return all subscriptions of a specific user by user id
subscriptionsRouter.get('/user/:id', (req, res) => {    
    res.send({ title: 'All subscriptions of a specific user by user id' });
});

// PUT /subscriptions/:id/cancel Cancel a specific subscription by id
subscriptionsRouter.put('/:id/cancel', (req, res) => {
    res.send({ title: 'Subscription cancelled' });
});

// GET /subscriptions/upcoming-renewals return all subscriptions with upcoming renewals
subscriptionsRouter.get('/upcoming-renewals', (req, res) => {  
    res.send({ title: 'All subscriptions with upcoming renewals' });
});

export default subscriptionsRouter;
