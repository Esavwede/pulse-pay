import { Application, Router } from "express"
import paymentController from "./payment.controller"
import validateRequest from "../shared/middleware/validation/request"
import {
  PaymentRequestSchema,
  VerifyTransactionWithTxRefRequestSchema,
} from "./payment.schema"

const router = Router()

export default function paymentRoutes(app: Application) {
  router.post(
    "/",
    validateRequest(PaymentRequestSchema),
    paymentController.processPayment.bind(paymentController),
  )

  router.get(
    "/:txRef",
    validateRequest(VerifyTransactionWithTxRefRequestSchema),
    paymentController.verifyPayment.bind(paymentController),
  )

  app.use("/api/v1/payments", router)
  return router
}
