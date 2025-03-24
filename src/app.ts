import express from "express"
import helmet from "helmet"
import cors from "cors"
import logger from "./core/logging/logger"
import requestLogger from "./shared/middleware/logging/request-logger"
import paymentRoutes from "./payment/payment.routes"
import errorHandler from "./shared/middleware/errors/error-handler"

const app = express()
const PORT = process.env.PORT || 3000

// Security Middleware
app.use(helmet())
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
)

// logging
app.use(requestLogger)

// core middlewares
app.use(express.json())

// routes
paymentRoutes(app)

// error
app.use(errorHandler)
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception:", err)
  process.exit(1)
})

process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason)
})

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

export default app
