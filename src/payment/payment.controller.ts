import { Request, Response } from "express"
import logger from "../core/logging/logger"

class PaymentController {
  // eslint-disable-next-line class-methods-use-this
  async processPayment(req: Request, res: Response) {
    logger.info(`Processing payment for order ${req.body.order}`)
    res.send("Payment processed")
  }
}

const paymentController = new PaymentController()
export default paymentController
