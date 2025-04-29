import { Router } from 'express';
import { login, logout, me } from '../controllers/auth.controller';

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
router.get('/me', me);

export default router;
