"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const database_1 = __importDefault(require("./core/database/database"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Wait for the database connection to complete
            yield (0, database_1.default)();
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
            logger_1.default.info("Server setup completed after database connection."); // confirmation log
        }
        catch (error) {
            logger_1.default.error("Failed to start server:", error);
            process.exit(1); // Exit if database connection or server start fails
        }
    });
}
startServer(); // Call the async function to start the server
exports.default = app;
