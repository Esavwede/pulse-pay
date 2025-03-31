"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractJsonFromJson;
const logger_1 = __importDefault(require("../../../core/logging/logger"));
const ApiError_1 = __importDefault(require("../ApiError"));
/* eslint-disable prefer-destructuring */
function extractJsonFromJson(jsonData) {
    try {
        const data = jsonData.data;
        const customer = data.customer;
        const paymentDetails = {
            status: jsonData.status,
            message: "Payment details retrieved successfully.",
            payment: {
                id: `PAY-${data.id}`,
                customer_name: customer.name,
                customer_email: customer.email,
                amount: data.amount,
                status: data.status,
            },
        };
        logger_1.default.info("Util: payment details extracted successfully");
        return paymentDetails;
    }
    catch (e) {
        logger_1.default.error(e, "Extract Payment Details");
        throw new ApiError_1.default("server error", 500);
    }
}
