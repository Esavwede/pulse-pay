import { Application, Router } from "express"
import paymentController from "./payment.controller"
import validateRequest from "../shared/middleware/validation/request"
import { PaymentRequestSchema } from "./payment.schema"

const router = Router()

export default function paymentRoutes(app: Application) {
  router.post(
    "/",
    validateRequest(PaymentRequestSchema),
    paymentController.processPayment,
  )

  app.use("api/v1/payment", router)
  return router
}
