import express from 'express';
import { getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import { validateExperience, handleValidationErrors } from '../middlewares/validation.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);
router.post('/', verifyToken, validateExperience, handleValidationErrors, createExperience);
router.put('/:id', verifyToken, validateExperience, handleValidationErrors, updateExperience);
router.delete('/:id', verifyToken, deleteExperience);

export default router;