import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import cors from 'cors';

// routes
import categoryRoute from './src/routes/categoryRoute.js';
import techRoute from './src/routes/techRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('API sedang berjalan...');
});

// routes
app.use('/api/categories', categoryRoute);
app.use('/api/techs', techRoute);

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