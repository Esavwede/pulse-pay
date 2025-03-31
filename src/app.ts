import express from "express"
import helmet from "helmet"
import cors from "cors"
import logger from "./core/logging/logger"
import requestLogger from "./shared/middleware/logging/request-logger"
import paymentRoutes from "./payment/payment.routes"
import errorHandler from "./shared/middleware/errors/error-handler"
import createDatabaseConnection from "./core/database/database"

const app = express()
const PORT = process.env.PORT || 3000

async function startServer() {
  try {
    // Wait for the database connection to complete
    await createDatabaseConnection()

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

    // 404 Middleware
    app.use((req, res) => {
      res.status(404).json({ success: false, message: "Resource not found" })
    })

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

    logger.info("Server setup completed after database connection.") // confirmation log
  } catch (error) {
    logger.error("Failed to start server:", error)
    process.exit(1) // Exit if database connection or server start fails
  }
}

startServer() // Call the async function to start the server

export default app
