"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
exports.default = errorHandler;
