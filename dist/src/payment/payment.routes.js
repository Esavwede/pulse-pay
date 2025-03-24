"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = paymentRoutes;
const express_1 = require("express");
const payment_controller_1 = __importDefault(require("./payment.controller"));
const request_1 = __importDefault(require("../shared/middleware/validation/request"));
const payment_schema_1 = require("./payment.schema");
const router = (0, express_1.Router)();
function paymentRoutes(app) {
    router.post("/", (0, request_1.default)(payment_schema_1.PaymentRequestSchema), payment_controller_1.default.processPayment.bind(payment_controller_1.default));
    router.get("/:txRef", (0, request_1.default)(payment_schema_1.VerifyTransactionWithTxRefRequestSchema), payment_controller_1.default.verifyPayment.bind(payment_controller_1.default));
    app.use("/api/v1/payments", router);
    return router;
}
