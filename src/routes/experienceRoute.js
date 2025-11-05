import express from 'express';
import { getAllExperiences, getExperienceById, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import { validateExperience, handleValidationErrors } from '../middlewares/validation.js';

const router = express.Router();

router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);
router.post('/', validateExperience, handleValidationErrors, createExperience);
router.put('/:id', validateExperience, handleValidationErrors, updateExperience);
router.delete('/:id', deleteExperience);

export default router;