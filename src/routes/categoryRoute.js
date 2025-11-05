import express from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory} from '../controllers/categoryController.js';
import { validateCategory, handleValidationErrors } from '../middlewares/validation.js';

const router = express.Router();

router.post('/', validateCategory, handleValidationErrors, createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', validateCategory, handleValidationErrors, updateCategory);
router.delete('/:id', deleteCategory);

export default router;