import { Router } from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser, toggleUserStatus } from '../controllers/user.controller';
import { isAuthenticated, isAdmin } from '../middlewares/auth.middleware';

const router = Router();

/**
 * Routes protégées : admin uniquement
 */
router.use(isAuthenticated, isAdmin);

/**
 * @route POST /api/users
 */
router.post('/', createUser);

/**
 * @route GET /api/users
 */
router.get('/', getAllUsers);

/**
 * @route GET /api/users/:id
 */
router.get('/:id', getUserById);

/**
 * @route PUT /api/users/:id
 */
router.put('/:id', updateUser);

/**
 * @route DELETE /api/users/:id
 */
router.delete('/:id', deleteUser);

/**
 * @route PATCH /api/users/:id/status
 */
router.patch('/:id/status', toggleUserStatus);

export default router;
