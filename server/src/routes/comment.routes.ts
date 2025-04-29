import { Router } from 'express';
import { createComment, getCommentsByTicket } from '../controllers/comment.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';

const router = Router();

router.use(isAuthenticated);

/**
 * @route POST /api/comments
 */
router.post('/', createComment);

/**
 * @route GET /api/comments/ticket/:ticketId
 */
router.get('/ticket/:ticketId', getCommentsByTicket);

export default router;
