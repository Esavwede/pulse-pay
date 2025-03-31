import dotenv from "dotenv"
import Flutterwave from "flutterwave-node-v3"
import { v4 as uuidv4 } from "uuid"
import PaymentDto from "./payment.dto"
import ApiError from "../shared/utils/ApiError"
import appendTxRefToResponse from "../shared/utils/misc/append-transaction-id-to-response"
import logger from "../core/logging/logger"

dotenv.config()

// Validate environment variables
if (!process.env.FLW_PUBLIC_KEY || !process.env.FLW_SECRET_KEY) {
  throw new Error(
    "Flutterwave API keys are not set in the environment variables",
  )
}

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY,
)

// eslint-disable-next-line consistent-return
export const chargeViaBankTransfer = async (data: PaymentDto) => {
  const txRef = uuidv4()
  const payload = {
    tx_ref: txRef,
    amount: data.amount,
    email: data.email,
    fullname: data.name,
    phone_number: "054709929220",
    currency: "NGN",
    client_ip: "154.123.220.1",
    device_fingerprint: "62wd23423rq324323qew1",
    expires: 3600,
  }

  logger.info("Flutterwave: Initiating charge by bank transfer")
  const response = await flw.Charge.bank_transfer(payload)

  if (response.status === "error") {
    logger.error(
      response,
      "Flutterwave: Could not initiate charge by bank transfer",
    )
    throw new ApiError("server error", 503)
  }
  appendTxRefToResponse(response, txRef)
  logger.info(
    "Flutterwave: charge by bank transfer initiated. Awaiting Payment",
  )
  return response
}

export const verifyPayment = async (txRef: string): Promise<any> => {
  const response = await flw.Transaction.verify_by_tx({
    tx_ref: txRef,
  })

  if (response.status === "error") {
    logger.error(
      response.message,
      "Flutterwave: Could not fetch payment details for verification",
    )
    throw new ApiError(response.message, 404)
  }
  logger.info("Flutterwave: Payment details fetched")
  return response
}
