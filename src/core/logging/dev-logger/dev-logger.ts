import pino from "pino"
import pretty from "pino-pretty"
import { join } from "path"
import fs from "fs"

const logFilePath = join(__dirname, "../../logs/dev.log")

if (!fs.existsSync(join(__dirname, "../../logs"))) {
  fs.mkdirSync(join(__dirname, "../../logs"))
}

const streams = [
  { stream: pretty({ colorize: true }) }, // Pretty-print logs to console
  { stream: fs.createWriteStream(logFilePath, { flags: "a" }) }, // Append logs to a file
]

// Configure logger
const devLogger = pino(
  {
    level: "debug", // Set to 'debug' for detailed logs in development
    timestamp: pino.stdTimeFunctions.isoTime, // ISO timestamps for consistency
  },
  pino.multistream(streams),
)

export default devLogger
