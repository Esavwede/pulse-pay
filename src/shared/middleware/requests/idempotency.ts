import { Request, Response, NextFunction } from "express"
import logger from "../../../core/logging/logger"

export const idempotencyStore: Record<string, any> = {} // In-memory storage

export default function setIdempotency(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const key = req.headers["idempotency-key"] as string

  if (!key) {
    res.status(400).json({ message: "Idempotency key is required in headers" })
    return
  }

  if (idempotencyStore[key]) {
    logger.info("idempotency store hit")
    res.status(200).json(idempotencyStore[key]) // Return cached response
    return
  }

  console.log("----Debug")
  res.locals.idempotencyKey = key
  next()
}
