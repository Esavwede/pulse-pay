"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pino_http_1 = __importDefault(require("pino-http"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./core/logging/logger"));
const request_logger_1 = __importDefault(require("./shared/middleware/logging/request-logger"));
const payment_routes_1 = __importDefault(require("./payment/payment.routes"));
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
// Application Logging Middleware
app.use((0, pino_http_1.default)(logger_1.default));
app.use(request_logger_1.default);
// routes
(0, payment_routes_1.default)(app);
app.get("/", (req, res) => {
    req.log.info("home route hit");
    res.send("Hello, world!");
});
app.listen(PORT, () => {
    logger_1.default.info(`Server running on port ${PORT}`);
});
