"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pino_http_1 = __importDefault(require("pino-http"));
const logger_1 = __importDefault(require("./core/logging/logger"));
const request_logger_1 = __importDefault(require("./shared/middleware/logging/request-logger"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Application Logging Middleware
app.use((0, pino_http_1.default)(logger_1.default));
app.use(request_logger_1.default);
app.get("/", (req, res) => {
    req.log.info("home route hit");
    res.send("Hello, world!");
});
app.listen(PORT, () => {
    logger_1.default.info(`Server running on port ${PORT}`);
});
