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
exports.verifyPayment = exports.chargeViaBankTransfer = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const flutterwave_node_v3_1 = __importDefault(require("flutterwave-node-v3"));
const uuid_1 = require("uuid");
const ApiError_1 = __importDefault(require("../shared/utils/ApiError"));
const append_transaction_id_to_response_1 = __importDefault(require("../shared/utils/misc/append-transaction-id-to-response"));
const logger_1 = __importDefault(require("../core/logging/logger"));
dotenv_1.default.config();
// Validate environment variables
if (!process.env.FLW_PUBLIC_KEY || !process.env.FLW_SECRET_KEY) {
    throw new Error("Flutterwave API keys are not set in the environment variables");
}
const flw = new flutterwave_node_v3_1.default(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
// eslint-disable-next-line consistent-return
const chargeViaBankTransfer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const txRef = (0, uuid_1.v4)();
        const payload = {
            tx_ref: txRef,
            amount: data.amount,
            email: data.email,
            fullname: data.name,
            phone_number: "054709929220",
            currency: "NGN",
            client_ip: "154.123.220.1",
            device_fingerprint: "62wd23423rq324323qew1",
            expires: 3600,
        };
        const response = yield flw.Charge.bank_transfer(payload);
        (0, append_transaction_id_to_response_1.default)(response, txRef);
        logger_1.default.info("Payment details generated. Awaiting Payment");
        return response;
    }
    catch (e) {
        logger_1.default.error(e, "Payment Error");
        throw new ApiError_1.default("server error", 500);
    }
});
exports.chargeViaBankTransfer = chargeViaBankTransfer;
const verifyPayment = (txRef) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield flw.Transaction.verify_by_tx({
        tx_ref: txRef,
    });
    if (response.status === "error") {
        logger_1.default.error(response.message);
        throw new ApiError_1.default(response.message, 404);
    }
    logger_1.default.info("Payment details fetched");
    return response;
});
exports.verifyPayment = verifyPayment;
