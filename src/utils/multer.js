import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { v4 as uuidv4 } from 'uuid';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'personal_web',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        public_id: (req, file) => {
            const uniqueSuffix = `${Date.now()}-${uuidv4()}`;
            const ext = file.originalname.split('.').pop();
            return `${file.fieldname}-${uniqueSuffix}.${ext}`;
        }
    },
});
const upload = multer({ storage: storage });

export default upload;