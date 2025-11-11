import mongoose from "mongoose";

const techSchema = new mongoose.Schema({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    }
}, { _id : false });


const projectSchema = new mongoose.Schema({
    imageSrc: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    linkIcon: {
        type: String,
        required: true
    },
    linkUrl: {
        type: String,
        required: true
    },
    techIcons: [techSchema],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;