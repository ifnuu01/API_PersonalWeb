import express from 'express';
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject} from '../controllers/projectController.js';
import { validateProject, handleValidationErrors } from '../middlewares/validation.js';
import upload from '../utils/multer.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/', upload.single('image'), verifyToken, validateProject, handleValidationErrors, createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', upload.single('image'), verifyToken, validateProject, handleValidationErrors, updateProject);
router.delete('/:id', verifyToken, deleteProject);
export default router;