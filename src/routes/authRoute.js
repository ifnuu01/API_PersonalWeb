import express from 'express';
import { login } from '../controllers/authController.js';
import { validateLogin, handleValidationErrors } from '../middlewares/validation.js';

const router = express.Router();

router.post('/login', validateLogin, handleValidationErrors, login);
export default router;