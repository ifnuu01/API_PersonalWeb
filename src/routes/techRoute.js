import express from 'express';
import { getAllTechs, getTechById, createTech, updateTech, deleteTech } from '../controllers/techController.js';
import { validateTech, handleValidationErrors } from '../middlewares/validation.js';

const router = express.Router();

router.get('/', getAllTechs);
router.get('/:id', getTechById);
router.post('/', validateTech, handleValidationErrors, createTech);
router.put('/:id', validateTech, handleValidationErrors, updateTech);
router.delete('/:id', deleteTech);

export default router;