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
  try {
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

    const response = await flw.Charge.bank_transfer(payload)
    appendTxRefToResponse(response, txRef)
    logger.info("Payment details generated. Awaiting Payment")
    return response
  } catch (e) {
    logger.error(e, "Payment Error")
    throw new ApiError("server error", 500)
  }
}

export const verifyPayment = async (txRef: string): Promise<any> => {
  try {
    const response = await flw.Transaction.verify_by_tx({
      tx_ref: txRef,
    })

    logger.info("Payment details fetched")
    return response
  } catch (e) {
    throw new ApiError("server error", 500)
  }
}
