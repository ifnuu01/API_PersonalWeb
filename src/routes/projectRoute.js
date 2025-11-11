import express from 'express';
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject} from '../controllers/projectController.js';
import { validateProject, handleValidationErrors } from '../middlewares/validation.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.post('/', upload.single('image'), validateProject, handleValidationErrors, createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', upload.single('image'), validateProject, handleValidationErrors, updateProject);
router.delete('/:id', deleteProject);

export default router;