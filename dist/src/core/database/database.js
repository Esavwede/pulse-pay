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
exports.default = createDatabaseConnection;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../logging/logger"));
dotenv_1.default.config();
function createDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/database_name";
            const { connection } = mongoose_1.default;
            connection.on("connecting", () => {
                logger_1.default.info("connecting to database");
            });
            connection.on("connected", () => {
                logger_1.default.info("database connection created");
            });
            connection.on("disconnecting", () => {
                logger_1.default.info("database disconnecting");
            });
            connection.on("disconnected", () => {
                logger_1.default.info("database disconnected");
            });
            connection.on("error", (e) => {
                logger_1.default.error(e, "database connection error");
            });
            yield mongoose_1.default.connect(DB_URI);
        }
        catch (e) {
            logger_1.default.error(e, "could not create database connection");
            process.exit(1);
        }
    });
}
