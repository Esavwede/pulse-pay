"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const prodLogger = (0, pino_1.default)({
    level: process.env.LOG_LEVEL || "info",
    timestamp: pino_1.default.stdTimeFunctions.isoTime, // ISO timestamps for consistency
});
exports.default = prodLogger;
