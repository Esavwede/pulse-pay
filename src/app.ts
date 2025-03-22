import express from "express"
import PinoHttp from "pino-http"
import logger from "./core/logging/logger"
import requestLogger from "./shared/middleware/logging/request-logger"

const app = express()
const PORT = process.env.PORT || 3000

// Application Logging Middleware
app.use(PinoHttp(logger))
app.use(requestLogger)

app.get("/", (req, res) => {
  req.log.info("home route hit")
  res.send("Hello, world!")
})

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
