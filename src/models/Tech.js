import mongoose from "mongoose";

const techSchema = new mongoose.Schema({
    icon: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

const Tech = mongoose.model('Tech', techSchema);
export default Tech;
