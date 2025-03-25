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
const flutterwave_service_1 = require("./flutterwave.service");
const ApiError_1 = __importDefault(require("../shared/utils/ApiError"));
const extract_json_from_json_1 = __importDefault(require("../shared/utils/misc/extract-json-from-json"));
class PaymentService {
    // eslint-disable-next-line class-methods-use-this
    processPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, flutterwave_service_1.chargeViaBankTransfer)(data);
                return response;
            }
            catch (e) {
                throw new ApiError_1.default("server error", 500);
            }
        });
    }
    // eslint-disable-next-line class-methods-use-this
    verifyPayment(txRef) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield (0, flutterwave_service_1.verifyPayment)(txRef);
            response = (0, extract_json_from_json_1.default)(response);
            return response;
        });
    }
}
exports.default = PaymentService;
