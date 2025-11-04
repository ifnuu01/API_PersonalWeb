import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

categorySchema.pre('findOneAndDelete', async function(next) {
    const categoryId = this.getQuery()['_id'];
    await Blog.deleteMany({ category: categoryId });
    next();
});

const Category = mongoose.model('Category', categorySchema);
export default Category;