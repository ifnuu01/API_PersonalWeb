import Project from "../models/Project.js";
import { asyncHandler, AppError} from '../utils/errorHandler.js';
import Category from '../models/Category.js';

export const createProject = asyncHandler( async(req, res) => {
    const { title, description, linkIcon, linkUrl, techIcons, category } = req.body;
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
        if (req.file && req.file.path) {
            await cloudinary.uploader.destroy(req.file.filename);
        }
        throw new AppError(400, 'Kategori tidak ditemukan');
    }
    let imageSrc = null;
    if (req.file && req.file.path) {
        imageSrc = req.file.path;
    }
    const project = await Project.create({
        imageSrc,
        title,
        description,
        linkIcon,
        linkUrl,
        techIcons: techIcons,
        category
    })

    res.status(201).json({
        message: 'Project berhasil dibuat',
        data: project
    });
});

export const getAllProjects = asyncHandler( async(req, res) => {
    const projects = await Project.find().populate('category');

    res.status(200).json({
        message: 'Berhasil mendapatkan semua project',
        data: projects
    });
});

export const getProjectById = asyncHandler( async(req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id).populate('category');

    res.status(200).json({
        message: 'Berhasil mendapatkan project',
        data: project
    });
});

export const updateProject = asyncHandler( async(req, res) => {
    const { id } = req.params;
    const { title, description, linkIcon, linkUrl, techIcons, category } = req.body;
    const project = await Project.findById(id);
    if (!project) {
        throw new AppError(404, 'Project tidak ditemukan');
    }
    if (category) {
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            if (req.file && req.file.path) {
                await cloudinary.uploader.destroy(req.file.filename);
            }
            throw new AppError(400, 'Kategori tidak ditemukan');
        }
    }
    if (req.file && req.file.path) {
        if (project.imageSrc) {
            const oldPublicId = project.imageSrc.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`personal-web/${oldPublicId}`);
        }
        project.imageSrc = req.file.path;
    }
    project.title = title || project.title;
    project.description = description || project.description;
    project.linkIcon = linkIcon || project.linkIcon;
    project.linkUrl = linkUrl || project.linkUrl;
    project.techIcons = techIcons ? techIcons : project.techIcons;
    project.category = category || project.category;
    await project.save();

    res.status(200).json({
        message: 'Project berhasil diperbarui',
        data: project
    });
});

export const deleteProject = asyncHandler( async(req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
        throw new AppError(404, 'Project tidak ditemukan');
    }
    if (project.imageSrc) {
        const oldPublicId = project.imageSrc.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`personal-web/${oldPublicId}`);
    }
    await project.remove();

    res.status(200).json({
        message: 'Project berhasil dihapus'
    });
});