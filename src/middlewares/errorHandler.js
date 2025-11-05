export const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const errorHandler = (err, res) => {
    console.log(err);
    if(err.statusCode) 
    {
        return res.status(err.statusCode).json({ message: err.message });
    }
    res.status(500).json({ message: 'Internal server error' });
};

export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
    };
};