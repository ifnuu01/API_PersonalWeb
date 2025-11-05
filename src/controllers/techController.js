import Tech from '../models/Tech.js';
import { asyncHandler, AppError} from '../middlewares/errorHandler.js';

export const createTech = asyncHandler( async (req, res) => {
    const { icon } = req.body;
    const tech = await Tech.create({ icon });

    res.status(201).json({
        message: 'Tech berhasil dibuat',
        data: tech
    });
});

export const getAllTechs = asyncHandler( async (req, res) => {
    const techs = await Tech.find();

    res.status(200).json({
        message: 'Berhasil mendapatkan semua tech',
        data: techs
    });
});

export const getTechById = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const tech = await Tech.findById(id);
    if (!tech) {
        throw new AppError(404, 'Tech tidak ditemukan');
    }

    res.status(200).json({
        message: 'Berhasil mendapatkan tech',
        data: tech
    });
});

export const updateTech = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const { icon } = req.body;
    const tech = await Tech.findById(id);
    if (!tech) {
        throw new AppError(404, 'Tech tidak ditemukan');
    }
    tech.icon = icon;
    await tech.save();

    res.status(200).json({
        message: 'Berhasil memperbarui tech',
        data: tech
    });
});

export const deleteTech = asyncHandler( async (req, res) => {
    const { id } = req.params;
    const tech = await Tech.findById(id);
    if (!tech) {
        throw new AppError(404, 'Tech tidak ditemukan');
    }
    await tech.remove();

    res.status(200).json({
        message: 'Berhasil menghapus tech',
        data: tech
    });
});
