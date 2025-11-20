import { body, validationResult } from 'express-validator';
import cloudinary from '../config/cloudinary.js';

export const handleValidationErrors = async ( req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if(req.file && req.file.path) {
            try {
                await cloudinary.uploader.destroy(req.file.filename);
            } catch (error) {
                console.error("Gagal menghapus file di Cloudinary:", error.message);   
            }
        }
        return res.status(400).json({
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

export const validateCategory = [
    body('name')
        .notEmpty().withMessage('Nama kategori harus diisi').bail()
        .isLength({ min: 2 }).withMessage('Nama kategori harus terdiri dari minimal 2 karakter').bail()
];

export const validateTech = [
    body('icon')
        .notEmpty().withMessage('Icon teknologi harus diisi').bail()
        .isLength({ min: 2 }).withMessage('Icon teknologi harus terdiri dari minimal 2 karakter').bail()
];

export const validateExperience = [
    body('title')
        .notEmpty().withMessage('Judul pengalaman harus diisi').bail()
        .isLength({ min: 2 }).withMessage('Judul pengalaman harus terdiri dari minimal 2 karakter').bail(),
    body('company')
        .notEmpty().withMessage('Nama perusahaan harus diisi').bail()
        .isLength({ min: 2 }).withMessage('Nama perusahaan harus terdiri dari minimal 2 karakter').bail(),
    body('startDate')
        .notEmpty().withMessage('Tanggal mulai harus diisi').bail()
        .isDate({ format: 'YYYY-MM-DD' }).withMessage('Tanggal mulai harus berupa tanggal yang valid').bail(),
    body('endDate')
        .optional({ nullable: true, checkFalsy: true })
        .isDate({ format: 'YYYY-MM-DD' }).withMessage('Tanggal selesai harus berupa tanggal yang valid').bail()
        .custom((value, { req}) => {
            if (value && new Date(value) < new Date(req.body.startDate)) {
                throw new Error('Tanggal selesai tidak boleh lebih awal dari tanggal mulai');
            }
            return true;
        }).bail(),
    body('description')
        .notEmpty().withMessage('Deskripsi pengalaman harus diisi').bail()
        .isLength({ min: 10 }).withMessage('Deskripsi pengalaman harus terdiri dari minimal 10 karakter').bail(),
    body('icon')
        .notEmpty().withMessage('Icon pengalaman harus diisi').bail()
        .isLength({ min: 2 }).withMessage('Icon pengalaman harus terdiri dari minimal 2 karakter').bail()
];

export const validateCertificate = [
    body('title')
        .notEmpty().withMessage('Judul sertifikat harus diisi').bail()
        .isLength({ min: 2 }).withMessage('Judul sertifikat harus terdiri dari minimal 2 karakter').bail(),
    body('description')
        .notEmpty().withMessage('Deskripsi sertifikat harus diisi').bail()
        .isLength({ min: 10 }).withMessage('Deskripsi sertifikat harus terdiri dari minimal 10 karakter').bail(),
    body('institution')
        .notEmpty().withMessage('Institusi sertifikat harus diisi').bail()
        .isLength({ min: 2 }).withMessage('Institusi sertifikat harus terdiri dari minimal 2 karakter').bail(),
];

export const validateBlog = [
    body('title')
        .notEmpty().withMessage('Judul blog harus diisi').bail()
        .isLength({ min: 2 }).withMessage('Judul blog harus terdiri dari minimal 2 karakter').bail(),
    body('image')
        .optional()
        .matches(/\.(jpg|jpeg|png)$/i).withMessage('Gambar harus berupa file dengan ekstensi jpg, jpeg, atau png').bail(),
    body('content')
        .notEmpty().withMessage('Konten blog harus diisi').bail()
        .isLength({ min: 10 }).withMessage('Konten blog harus terdiri dari minimal 10 karakter').bail(),
    body('category')
        .notEmpty().withMessage('Kategori blog harus diisi').bail()
        .isMongoId().withMessage('Kategori blog harus berupa ID MongoDB yang valid').bail()
];

export const validateProject = [
    body('title')
        .notEmpty().withMessage('Judul proyek harus diisi').bail()
        .isLength({ min: 2 }).withMessage('Judul proyek harus terdiri dari minimal 2 karakter').bail(),
    body('description')
        .notEmpty().withMessage('Deskripsi proyek harus diisi').bail()
        .isLength({ min: 10 }).withMessage('Deskripsi proyek harus terdiri dari minimal 10 karakter').bail(),
    body('linkIcon')
        .notEmpty().withMessage('Icon link proyek harus diisi').bail()
        .isLength({ min: 2 }).withMessage('Icon link proyek harus terdiri dari minimal 2 karakter').bail(),
    body('linkUrl')
        .notEmpty().withMessage('URL link proyek harus diisi').bail()
        .isURL().withMessage('URL link proyek harus berupa URL yang valid').bail(),
    body('category')
        .notEmpty().withMessage('Kategori proyek harus diisi').bail()
        .isMongoId().withMessage('Kategori proyek harus berupa ID MongoDB yang valid').bail(),
    body('techIcons')
        .isArray({ min: 1 }).withMessage('Setidaknya harus ada satu icon teknologi').bail(),
    body('techIcons.*.src')
        .notEmpty().withMessage('Src icon teknologi harus diisi').bail()
        .isLength({ min: 2 }).withMessage('Src icon teknologi harus terdiri dari minimal 2 karakter').bail(),
    body('techIcons.*.alt')
        .notEmpty().withMessage('Alt icon teknologi harus diisi').bail()
        .isLength({ min: 2 }).withMessage('Alt icon teknologi harus terdiri dari minimal 2 karakter').bail()
];

export const validateLogin = [
    body('username')
        .notEmpty().withMessage('Username harus diisi').bail()
        .isLength({ min: 3 }).withMessage('Username harus terdiri dari minimal 3 karakter').bail(),
    body('password')
        .notEmpty().withMessage('Password harus diisi').bail()
        .isLength({ min: 6 }).withMessage('Password harus terdiri dari minimal 6 karakter').bail()
];