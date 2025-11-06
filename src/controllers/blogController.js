import Blog from '../models/Blog.js';
import { asyncHandler, AppError} from '../utils/errorHandler.js';
import Category from '../models/Category.js';

export const createBlog = asyncHandler( async(req, res) => {
    const { title, content, category } = req.body;
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
        if (req.file && req.file.path) {
            await cloudinary.uploader.destroy(req.file.filename);
        }
        throw new AppError(400, 'Kategori tidak ditemukan');
    }
    let imageUrl = null;
    if (req.file && req.file.path) {
        imageUrl = req.file.path;
    }
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const blog = await Blog.create({
        title,
        imageUrl,
        content,
        slug,
        category
    })

    res.status(201).json({
        message: 'Blog berhasil dibuat',
        data: blog
    });
});

export const getAllBlogs = asyncHandler( async(req, res) => {
    const blogs = await Blog.find().populate('category');
    res.status(200).json({
        message: 'Berhasil mendapatkan semua blog',
        data: blogs
    });
});

export const getBlogBySlug = asyncHandler( async(req, res) => {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug }).populate('category');
    if (!blog) {
        throw new AppError(404, 'Blog tidak ditemukan');
    }

    res.status(200).json({
        message: 'Berhasil mendapatkan blog',
        data: blog
    });
});

export const updateBlog = asyncHandler( async(req, res) => {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new AppError(404, 'Blog tidak ditemukan');
    }
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
        if (req.file && req.file.path) {
            await cloudinary.uploader.destroy(req.file.filename);
        }
        throw new AppError(400, 'Kategori tidak ditemukan');
    }
    if (req.file && req.file.path) {
        if (blog.imageUrl) {
            const oldPublicId = blog.imageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`personal_web/${oldPublicId}`);
        }
        blog.imageUrl = req.file.path;
    }
    blog.title = title || blog.title;
    const slug = title ? title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : blog.slug;
    blog.slug = slug;
    blog.content = content || blog.content;
    blog.category = category || blog.category;
    await blog.save();

    res.status(200).json({
        message: 'Blog berhasil diperbarui',
        data: blog
    });
});

export const deleteBlog = asyncHandler( async(req, res) => {
    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
        throw new AppError(404, 'Blog tidak ditemukan');
    }
    if (blog.imageUrl) {
        const publicId = blog.imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`personal_web/${publicId}`);
    }
    await blog.remove();

    res.status(200).json({
        message: 'Blog berhasil dihapus'
    });
});