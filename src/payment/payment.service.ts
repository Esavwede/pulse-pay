import PaymentDto from "./payment.dto"
import { chargeViaBankTransfer, verifyPayment } from "./flutterwave.service"
import ApiError from "../shared/utils/ApiError"
import extractJsonFromJson from "../shared/utils/misc/extract-json-from-json"

export default class PaymentService {
  // eslint-disable-next-line class-methods-use-this
  async processPayment(data: PaymentDto): Promise<JSON> {
    try {
      const response = await chargeViaBankTransfer(data)
      return response
    } catch (e: any) {
      throw new ApiError("server error", 500)
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async verifyPayment(txRef: string): Promise<JSON> {
    let response = await verifyPayment(txRef)
    response = extractJsonFromJson(response)
    return response
  }
}
