import { Application } from "express"
import productRoutes from "../../product/product.routes"
import paymentRoutes from "../../payment/payment.routes"
import logger from "../../core/logging/logger"

export default function createAppRoutes(app: Application) {
  try {
    productRoutes(app)
    paymentRoutes(app)
    logger.info("Application Routes Created")
  } catch (e: any) {
    logger.error(e, "App Routes Error")
    process.exit(1)
  }
}
