// src/middleware/errorHandler.ts
import { Request, Response } from "express"
import ApiError from "../../utils/ApiError"

const errorHandler = (err: ApiError, req: Request, res: Response) => {
  const statusCode = err.statusCode || 500
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  })
}

export default errorHandler
