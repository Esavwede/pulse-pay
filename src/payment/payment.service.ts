import logger from "../core/logging/logger"

class PaymentService {
  private paymentGateway: string

  constructor() {
    this.paymentGateway = "payment gateway"
  }

  static processPayment(order: string) {
    logger.info(`Processing payment for order ${order}`)
  }
}

const paymentService = new PaymentService()
export default paymentService
