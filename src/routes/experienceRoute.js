import express from 'express';
import { getExperiences, getExperienceById, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import { validationExperience, handleValidationErrors } from '../middlewares/validation.js';

const router = express.Router();

router.get('/', getExperiences);
router.get('/:id', getExperienceById);
router.post('/', validationExperience, handleValidationErrors, createExperience);
router.put('/:id', validationExperience, handleValidationErrors, updateExperience);
router.delete('/:id', deleteExperience);

export default router;