import express from 'express';
import { createCertificate, getAllCertificates, getCertificateById, updateCertificate, deleteCertificate } from '../controllers/certificateController.js';
import { validateCertificate, handleValidationErrors } from '../middlewares/validation.js';
import upload from '../utils/multer.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/', upload.single('image'), verifyToken, validateCertificate, handleValidationErrors, createCertificate);
router.get('/', getAllCertificates);
router.get('/:id', getCertificateById);
router.put('/:id', upload.single('image'), verifyToken, validateCertificate, handleValidationErrors, updateCertificate);
router.delete('/:id', verifyToken, deleteCertificate);
export default router;