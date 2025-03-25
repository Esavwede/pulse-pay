"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./core/logging/logger"));
const request_logger_1 = __importDefault(require("./shared/middleware/logging/request-logger"));
const payment_routes_1 = __importDefault(require("./payment/payment.routes"));
const error_handler_1 = __importDefault(require("./shared/middleware/errors/error-handler"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Security Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
// logging
app.use(request_logger_1.default);
// core middlewares
app.use(express_1.default.json());
// routes
(0, payment_routes_1.default)(app);
// 404 Middleware
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Resource not found" });
});
// error
app.use(error_handler_1.default);
process.on("uncaughtException", (err) => {
    logger_1.default.error("Uncaught Exception:", err);
    process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
    logger_1.default.error("Unhandled Rejection at:", promise, "reason:", reason);
});
app.listen(PORT, () => {
    logger_1.default.info(`Server running on port ${PORT}`);
});
exports.default = app;
