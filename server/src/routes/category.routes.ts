import { Router } from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/category.controller';
import { isAuthenticated, isAdmin } from '../middlewares/auth.middleware';

const router = Router();

router.use(isAuthenticated, isAdmin);

/**
 * @route POST /api/categories
 */
router.post('/', createCategory);

/**
 * @route GET /api/categories
 */
router.get('/', getCategories);

/**
 * @route GET /api/categories/:id
 */
router.get('/:id', getCategoryById);

/**
 * @route PUT /api/categories/:id
 */
router.put('/:id', updateCategory);

/**
 * @route DELETE /api/categories/:id
 */
router.delete('/:id', deleteCategory);

export default router;
