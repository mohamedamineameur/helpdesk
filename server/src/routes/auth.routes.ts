import { Router } from 'express';
import { login, logout, me } from '../controllers/auth.controller';
import { isAuthenticated} from '../middlewares/auth.middleware';


const router = Router();

/**
 * @route POST /api/auth/login
 */
router.post('/login', login);

/**
 * @route POST /api/auth/logout
 */
router.post('/logout', logout);

/**
 * @route GET /api/auth/me
 */
router.get('/me',isAuthenticated, me);

export default router;
