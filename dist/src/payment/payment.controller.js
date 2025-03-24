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
const payment_service_1 = __importDefault(require("./payment.service"));
const ApiError_1 = __importDefault(require("../shared/utils/ApiError"));
class PaymentController {
    constructor() {
        this.paymentService = new payment_service_1.default();
    }
    processPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.paymentService.processPayment(req.body);
                res.status(200).json({ response });
            }
            catch (e) {
                throw new ApiError_1.default("server error", 500);
            }
        });
    }
    verifyPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.paymentService.verifyPayment(req.params.txRef);
                res.status(200).json({ response });
            }
            catch (e) {
                throw new ApiError_1.default("server", 500);
            }
        });
    }
}
const paymentController = new PaymentController();
exports.default = paymentController;
