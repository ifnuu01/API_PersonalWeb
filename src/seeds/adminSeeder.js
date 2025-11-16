import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async() => {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({});
    console.log("Existing users deleted.");
    
    const admin = new User({
        username: process.env.ADMIN_USER,
        password: process.env.ADMIN_PASS,
    });

    await admin.save();
    console.log("Admin user created successfully.");
    process.exit();
}

seedAdmin();