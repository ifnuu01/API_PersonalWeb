import Certificate from "../models/Certificate.js";
import { asyncHandler, AppError} from '../utils/errorHandler.js';
import cloudinary from "../config/cloudinary.js";

export const createCertificate = asyncHandler( async(req, res) => {
    const { title, description, link } = req.body;
    let imageUrl = null;
    if (req.file && req.file.path) {
        imageUrl = req.file.path;
    }
    const certificate = await Certificate.create({
        imageUrl,
        title,
        description,
        link
    });

    res.status(201).json({
        message: 'Sertifikat berhasil dibuat',
        data: certificate
    });
});

export const getAllCertificates = asyncHandler( async(req, res) => {
    const certificates = await Certificate.find();

    res.status(200).json({
        message: 'Berhasil mendapatkan semua sertifikat',
        data: certificates
    });
});

export const getCertificateById = asyncHandler( async(req, res) => {
    const { id } = req.params;
    const certificate = await Certificate.findById(id);

    res.status(200).json({
        message: 'Berhasil mendapatkan sertifikat',
        data: certificate
    });
});

export const updateCertificate = asyncHandler( async(req, res) => {
    const { id } = req.params;
    const { title, description, link } = req.body;
    const certificate = await Certificate.findById(id);
    if (!certificate) {
        throw new AppError(404, 'Sertifikat tidak ditemukan');
    }
    if (req.file && req.file.path) {
        if (certificate.imageUrl) {
            const oldPublicId = certificate.imageUrl.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`personal-web/${oldPublicId}`);
        }
        certificate.imageUrl = req.file.path;
    }
    certificate.title = title;
    certificate.description = description;
    certificate.link = link;
    await certificate.save();

    res.status(200).json({
        message: 'Sertifikat berhasil diperbarui',
        data: certificate
    });
});

export const deleteCertificate = asyncHandler( async(req, res) => {
    const { id } = req.params;
    const certificate = await Certificate.findById(id);
    if (!certificate) {
        throw new AppError(404, 'Sertifikat tidak ditemukan');
    }
    if (certificate.imageUrl) {
        const publicId = certificate.imageUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`personal-web/${publicId}`);
    }
    await certificate.deleteOne();

    res.status(200).json({
        message: 'Sertifikat berhasil dihapus'
    });
});