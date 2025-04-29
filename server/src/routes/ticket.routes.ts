import { Router } from 'express';
import { createTicket, getTickets, getTicketById, updateTicketStatus, assignTicket, deleteTicket } from '../controllers/ticket.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';

const router = Router();

router.use(isAuthenticated);

/**
 * @route POST /api/tickets
 */
router.post('/', createTicket);

/**
 * @route GET /api/tickets
 */
router.get('/', getTickets);

/**
 * @route GET /api/tickets/:id
 */
router.get('/:id', getTicketById);

/**
 * @route PATCH /api/tickets/:id/status
 */
router.patch('/:id/status', updateTicketStatus);

/**
 * @route PATCH /api/tickets/:id/assign
 */
router.patch('/:id/assign', assignTicket);

/**
 * @route DELETE /api/tickets/:id
 */
router.delete('/:id', deleteTicket);

export default router;
