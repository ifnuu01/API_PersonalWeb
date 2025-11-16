import express from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory} from '../controllers/categoryController.js';
import { validateCategory, handleValidationErrors } from '../middlewares/validation.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/', validateCategory, handleValidationErrors, createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', verifyToken, validateCategory, handleValidationErrors, updateCategory);
router.delete('/:id', verifyToken, deleteCategory);

export default router;