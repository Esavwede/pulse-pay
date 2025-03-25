import { NextFunction, Request, Response } from "express"
import PaymentService from "./payment.service"
import { PaymentRequest, VerifyTransactionWithTxRef } from "./payment.schema"

class PaymentController {
  private paymentService: PaymentService

  constructor() {
    this.paymentService = new PaymentService()
  }

  async processPayment(
    req: Request<{}, {}, PaymentRequest["body"]>,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const response = await this.paymentService.processPayment(req.body)
      res.status(200).json({ response })
    } catch (e: any) {
      next(e)
    }
  }

  async verifyPayment(
    req: Request<VerifyTransactionWithTxRef["params"]>,
    res: Response,
    next: Function,
  ) {
    try {
      const response = await this.paymentService.verifyPayment(req.params.txRef)
      res.status(200).json({ response })
    } catch (e: any) {
      next(e)
    }
  }
}

const paymentController = new PaymentController()
export default paymentController
