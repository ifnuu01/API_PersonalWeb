import express from 'express';
import { getAllTechs, getTechById, createTech, updateTech, deleteTech } from '../controllers/techController.js';
import { validateTech, handleValidationErrors } from '../middlewares/validation.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', getAllTechs);
router.get('/:id', getTechById);
router.post('/', verifyToken, validateTech, handleValidationErrors, createTech);
router.put('/:id', verifyToken, validateTech, handleValidationErrors, updateTech);
router.delete('/:id', verifyToken, deleteTech);

export default router;