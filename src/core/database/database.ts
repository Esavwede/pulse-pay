import dotenv from "dotenv"
import mongoose from "mongoose"
import logger from "../logging/logger"

dotenv.config()

export default async function createDatabaseConnection() {
  try {
    const DB_URI =
      process.env.DB_URI || "mongodb://localhost:27017/database_name"
    const { connection } = mongoose

    connection.on("connecting", () => {
      logger.info("connecting to database")
    })

    connection.on("connected", () => {
      logger.info("database connection created")
    })

    connection.on("disconnecting", () => {
      logger.info("database disconnecting")
    })

    connection.on("disconnected", () => {
      logger.info("database disconnected")
    })

    connection.on("error", (e) => {
      logger.error(e, "database connection error")
    })

    await mongoose.connect(DB_URI)
  } catch (e: any) {
    logger.error(e, "could not create database connection")
    process.exit(1)
  }
}
