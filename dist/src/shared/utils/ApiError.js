"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/utils/ApiError.ts
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ApiError;
