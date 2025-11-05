import express from 'express';
import { getTechs, getTechById, createTech, updateTech, deleteTech } from '../controllers/techController.js';
import { validationTech, handleValidationErrors } from '../middlewares/validation.js';

const router = express.Router();

router.get('/', getTechs);
router.get('/:id', getTechById);
router.post('/', validationTech, handleValidationErrors, createTech);
router.put('/:id', validationTech, handleValidationErrors, updateTech);
router.delete('/:id', deleteTech);

export default router;