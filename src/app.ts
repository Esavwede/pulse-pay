import express from "express"
import PinoHttp from "pino-http"
import helmet from "helmet"
import cors from "cors"
import logger from "./core/logging/logger"
import requestLogger from "./shared/middleware/logging/request-logger"
import paymentRoutes from "./payment/payment.routes"

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

// Application Logging Middleware
app.use(PinoHttp(logger))
app.use(requestLogger)

// routes
paymentRoutes(app)

app.get("/", (req, res) => {
  req.log.info("home route hit")
  res.send("Hello, world!")
})

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
