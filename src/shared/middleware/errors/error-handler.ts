// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express"
import ApiError from "../../utils/ApiError"

const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  })
}

export default errorHandler
