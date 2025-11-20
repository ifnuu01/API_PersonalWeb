import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    institution : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;