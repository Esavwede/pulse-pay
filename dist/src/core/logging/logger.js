"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChildLogger = getChildLogger;
const dev_logger_1 = __importDefault(require("./dev-logger/dev-logger"));
const prod_logger_1 = __importDefault(require("./prod-logger/prod-logger"));
const logger = process.env.NODE_ENV === "development" ? dev_logger_1.default : prod_logger_1.default;
function getChildLogger(context) {
    return logger.child(context);
}
exports.default = logger;
