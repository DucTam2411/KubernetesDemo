import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets', async (req: Request, res: Response) => {
    const tickets = await Ticket.find({
        orderId: undefined,
    });

    res.send(tickets);
});

router.get('/api/tickets/my', async (req: Request, res: Response) => {
    const tickets = await Ticket.find({
        orderId: undefined,
        userId: req.currentUser?.id,
    });

    res.send(tickets);
});

export { router as indexTicketRouter };
