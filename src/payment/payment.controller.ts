import { Request, Response } from "express"
import PaymentService from "./payment.service"
import { PaymentRequest, VerifyTransactionWithTxRef } from "./payment.schema"
import ApiError from "../shared/utils/ApiError"

class PaymentController {
  private paymentService: PaymentService

  constructor() {
    this.paymentService = new PaymentService()
  }

  async processPayment(
    req: Request<{}, {}, PaymentRequest["body"]>,
    res: Response,
  ) {
    try {
      const response = await this.paymentService.processPayment(req.body)
      res.status(200).json({ response })
    } catch (e: any) {
      throw new ApiError("server error", 500)
    }
  }

  async verifyPayment(
    req: Request<VerifyTransactionWithTxRef["params"]>,
    res: Response,
  ) {
    try {
      const response = await this.paymentService.verifyPayment(req.params.txRef)
      res.status(200).json({ response })
    } catch (e: any) {
      throw new ApiError("server", 500)
    }
  }
}

const paymentController = new PaymentController()
export default paymentController
