"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyTransactionWithTxRefRequestSchema = exports.PaymentRequestSchema = void 0;
const zod_1 = require("zod");
exports.PaymentRequestSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            invalid_type_error: "Name must be a string",
            required_error: "Name is required",
        })
            .min(2)
            .max(255),
        email: zod_1.z
            .string({
            invalid_type_error: "Email must be a valid email",
            required_error: "Email is required",
        })
            .email(),
        amount: zod_1.z
            .number({
            invalid_type_error: "Amount must be a positive number greater than 0",
            required_error: "Amount is required",
        })
            .min(1)
            .positive(),
    }),
});
exports.VerifyTransactionWithTxRefRequestSchema = zod_1.z.object({
    params: zod_1.z.object({
        txRef: zod_1.z.string({
            required_error: "Transaction reference is required",
            invalid_type_error: "Transaction reference must be a string",
        }),
    }),
});
