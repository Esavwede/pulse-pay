"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = requestLogger;
const uuid_1 = require("uuid");
const logger_1 = require("../../../core/logging/logger");
function requestLogger(req, res, next) {
    // Get a request id from the header or generate a new one
    const requestId = req.headers["x-request-id"] || (0, uuid_1.v4)();
    req.requestId = requestId;
    // Create a child logger with the request id context
    req.log = (0, logger_1.getChildLogger)({ requestId });
    req.log.info("Incoming request", { method: req.method, url: req.url });
    // Optionally, log when the response is finished.
    res.on("finish", () => {
        var _a;
        (_a = req.log) === null || _a === void 0 ? void 0 : _a.info("Request completed", { statusCode: res.statusCode });
    });
    next();
}
