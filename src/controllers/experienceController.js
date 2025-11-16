import Experience from '../models/Experience.js';
import { asyncHandler, AppError} from '../utils/errorHandler.js';

export const createExperience = asyncHandler( async ( req, res) => {
    const { title, company, startDate, endDate, description, icon } = req.body;
    const experience = await Experience.create({ title, company, startDate, endDate, description, icon });
    
    res.status(201).json({
        message: 'Experience berhasil dibuat',
        data: experience
    });
});

export const getAllExperiences = asyncHandler( async ( req, res) => {
    const experiences = await Experience.find();
    
    res.status(200).json({
        message: 'Berhasil mendapatkan semua experience',
        data: experiences
    });
});

export const getExperienceById = asyncHandler( async ( req, res) => {
    const { id } = req.params;
    const experience = await Experience.findById(id);
    if (!experience) {
        throw new AppError(404, 'Experience tidak ditemukan');
    }

    res.status(200).json({
        message: 'Berhasil mendapatkan experience',
        data: experience
    });
});

export const updateExperience = asyncHandler( async ( req, res) => {
    const { id } = req.params;
    const { title, company, startDate, endDate, description, icon } = req.body;
    const experience = await Experience.findById(id);
    if (!experience) {
        throw new AppError(404, 'Experience tidak ditemukan');
    }
    experience.title = title;
    experience.company = company;
    experience.startDate = startDate;
    experience.endDate = endDate;
    experience.description = description;
    experience.icon = icon;
    await experience.save();

    res.status(200).json({
        message: 'Experience berhasil diperbarui',
        data: experience
    });
});

export const deleteExperience = asyncHandler( async ( req, res) => {
    const { id } = req.params;
    const experience = await Experience.findById(id);
    if (!experience) {
        throw new AppError(404, 'Experience tidak ditemukan');
    }
    await experience.deleteOne();

    res.status(200).json({
        message: 'Experience berhasil dihapus'
    });
});
    