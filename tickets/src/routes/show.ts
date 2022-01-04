import express, { Request, Response } from 'express';
import {
    currentUser,
    NotFoundError,
    requireAuth,
    validateRequest,
} from '@ductam2943/common';
import { mongoose, Ticket } from '../models/ticket';

const router = express.Router();

router.get(
    '/api/tickets/stock',
    currentUser,
    requireAuth,
    async (req: Request, res: Response) => {
        const tickets = await Ticket.find({
            userId: req.currentUser?.id,
        });

        res.send(tickets);
    }
);

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    const tickets = await Ticket.findById(req.params.id);

    if (!tickets) {
        throw new NotFoundError();
    }

    res.send(tickets);
});

export { router as showTicketRouter };
