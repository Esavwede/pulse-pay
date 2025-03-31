import "reflect-metadata"
import { Application, Router } from "express"
import validateRequest from "../shared/middleware/validation/request"
import {
  CreateProductRequestSchema,
  GetProductsRequestSchema,
  GetProductRequestSchema,
} from "./product.schema"
import productController from "./product.con"
import setIdempotency from "../shared/middleware/requests/idempotency"

const router = Router()

export default function productRoutes(app: Application) {
  router.post(
    "/",
    validateRequest(CreateProductRequestSchema),
    setIdempotency, //  A temporary implementation for development, will upgrade to redis
    productController.create.bind(productController),
  )

  router.get(
    "/",
    validateRequest(GetProductsRequestSchema),
    productController.getProducts.bind(productController),
  )

  router.get(
    "/:id",
    validateRequest(GetProductRequestSchema),
    productController.getProduct.bind(productController),
  )

  router.put(
    "/:id",
    validateRequest(GetProductRequestSchema),
    setIdempotency, // A temporary implementation for development, will upgrade to redis
    productController.updateProduct.bind(productController),
  )

  router.delete(
    "/:id",
    validateRequest(GetProductRequestSchema),
    productController.deleteProduct.bind(productController),
  )
  app.use("/api/v1/products", router)
  return router
}
