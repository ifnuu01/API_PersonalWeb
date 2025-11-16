import express from 'express';
import { createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { validateBlog, handleValidationErrors } from '../middlewares/validation.js';
import upload from '../utils/multer.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/', upload.single('image'), verifyToken, validateBlog, handleValidationErrors, createBlog);
router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);
router.put('/:id', upload.single('image'), verifyToken, validateBlog, handleValidationErrors, updateBlog);
router.delete('/:id', verifyToken, deleteBlog);
export default router;