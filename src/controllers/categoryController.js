import Category from '../models/Category.js';
import { asyncHandler, AppError} from '../utils/errorHandler.js';

export const createCategory = asyncHandler( async (req, res) => {
    const { name } = req.body;
    const category = await Category.create({ name });

    res.status(201).json({
        message: 'Kategori berhasil dibuat',
        data: category
    });
});

export const getAllCategories = asyncHandler( async (req, res) => {
    const categories = await Category.find();

    res.status(200).json({
        message: 'Berhasil mendapatkan semua kategori',
        data: categories
    });
});

export const getCategoryById = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
        throw new AppError(404, 'Kategori tidak ditemukan');
    }

    res.status(200).json({
        message: 'Berhasil mendapatkan kategori',
        data: category
    });
});

export const updateCategory = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
        throw new AppError(404, 'Kategori tidak ditemukan');
    }

    category.name = name;
    await category.save();

    res.status(200).json({
        message: 'Berhasil memperbarui kategori',
        data: category
    });
});

export const deleteCategory = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
        throw new AppError(404, 'Kategori tidak ditemukan');
    }
    await category.destroy();

    res.status(200).json({
        message: 'Berhasil menghapus kategori'
    });
});