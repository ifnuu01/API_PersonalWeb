import express from 'express';
import { createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog } from '../controllers/blogController.js';
import { validateBlog, handleValidationErrors } from '../middlewares/validation.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.post('/', upload.single('image'), validateBlog, handleValidationErrors, createBlog);
router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);
router.put('/:id', upload.single('image'), validateBlog, handleValidationErrors, updateBlog);
router.delete('/:id', deleteBlog);

export default router;