import express from 'express';
import { createCertificate, getAllCertificates, getCertificateById, updateCertificate, deleteCertificate } from '../controllers/certificateController.js';
import { validateCertificate, handleValidationErrors } from '../middlewares/validation.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.post('/', upload.single('image'), validateCertificate, handleValidationErrors, createCertificate);
router.get('/', getAllCertificates);
router.get('/:id', getCertificateById);
router.put('/:id', upload.single('image'), validateCertificate, handleValidationErrors, updateCertificate);
router.delete('/:id', deleteCertificate);

export default router;