import PaymentDto from "./payment.dto"
import { chargeViaBankTransfer, verifyPayment } from "./flutterwave.service"
import extractJsonFromJson from "../shared/utils/misc/extract-json-from-json"

export default class PaymentService {
  // eslint-disable-next-line class-methods-use-this
  async processPayment(data: PaymentDto): Promise<JSON> {
    console.log("in payment services")
    const response = await chargeViaBankTransfer(data)
    return response
  }

  // eslint-disable-next-line class-methods-use-this
  async verifyPayment(txRef: string): Promise<JSON> {
    let response = await verifyPayment(txRef)
    response = extractJsonFromJson(response)
    return response
  }
}
