import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import cors from 'cors';

// routes
import categoryRoute from './src/routes/categoryRoute.js';
import techRoute from './src/routes/techRoute.js';
import experienceRoute from './src/routes/experienceRoute.js';
import blogRoute from './src/routes/blogRoute.js';
import projectRoute from './src/routes/projectRoute.js';
import certificateRoute from './src/routes/certificateRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true, }));
app.use(express.json({ extended: true, }));


app.get('/', (req, res) => {
    res.send('API sedang berjalan...');
});

// routes
app.use('/api/categories', categoryRoute);
app.use('/api/techs', techRoute);
app.use('/api/experiences', experienceRoute);
app.use('/api/blogs', blogRoute);
app.use('/api/projects', projectRoute);
app.use('/api/certificates', certificateRoute);

// 404
app.use((req, res) => {
    res.status(404).json({
        message: `Tidak ditemukan ${req.originalUrl} di server ini`
    });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("Failed to start server:", error.message);
});