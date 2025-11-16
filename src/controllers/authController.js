import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { asyncHandler, AppError } from "../utils/errorHandler.js";

export const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        throw new AppError(401, 'Username anda salah');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new AppError(401, 'Password anda salah');
    }

    const token = generateToken(user._id, '1d');
    res.json({ 
        message: 'Login berhasil',
        token,
        user: {
            id: user._id,
            username: user.username
        }
     });
});