import express, { Router } from 'express';

const routes: Router = express.Router();

routes.get('/me', (req, res) => {
    res.send("Hello i am user")
});

export default routes;