/* eslint-disable no-useless-catch */
import "reflect-metadata"
import { NextFunction, Request, Response } from "express"
import { autoInjectable, inject, container } from "tsyringe" // Import container
import mongoose from "mongoose"
import { ProductService } from "./product.service"
import {
  CreateProductRequest,
  DeleteProductRequest,
  GetProductRequest,
  GetProductsRequest,
  UpdateProductRequest,
} from "./product.schema"
import ApiError from "../shared/utils/ApiError"
import { idempotencyStore } from "../shared/middleware/requests/idempotency"

@autoInjectable()
class ProductController {
  constructor(@inject(ProductService) private productService: ProductService) {
    console.dir(this.productService)
  }

  async create(
    req: Request<{}, {}, CreateProductRequest["body"]>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const createdProduct = await this.productService.create(req.body)
      // Store response in memory (expires after 5 minutes)
      idempotencyStore[res.locals.idempotencyKey] = createdProduct

      setTimeout(
        () => {
          delete idempotencyStore[res.locals.idempotencyKey] // Auto-cleanup
        },
        5 * 60 * 1000,
      ) // 5 minutes
      res.status(201).json({
        status: "success",
        message: "product created",
        data: createdProduct,
      })
    } catch (e: any) {
      next(e)
    }
  }

  async getProducts(
    req: Request<GetProductsRequest["query"]>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { productCount, productSkip } = req.query
      const productCountValue = productCount
        ? parseInt(productCount as string, 10)
        : 0
      const productSkipValue = productSkip
        ? parseInt(productSkip as string, 10)
        : 0
      const products = await this.productService.getProducts(
        productCountValue,
        productSkipValue,
      )
      res.status(200).json({
        status: "success",
        message: "products fetched",
        data: products,
      })
    } catch (e: any) {
      next(e)
    }
  }

  async getProduct(
    req: Request<GetProductRequest["params"]>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!mongoose.isValidObjectId(req.params.id)) {
        throw new ApiError("invalid product id", 400)
      }

      const product = await this.productService.getProduct(req.params.id)
      res.status(200).json({
        status: "success",
        message: "product fetched",
        data: product,
      })
    } catch (e: any) {
      next(e)
    }
  }

  async updateProduct(
    req: Request<
      UpdateProductRequest["params"],
      {},
      UpdateProductRequest["body"]
    >,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params
      if (!mongoose.isValidObjectId(id)) {
        throw new ApiError("invalid product id", 400)
      }
      const updates = req.body
      const updatedProduct = await this.productService.updateProduct(
        id,
        updates,
      )
      // Store response in memory (expires after 5 minutes)
      idempotencyStore[res.locals.idempotencyKey] = updatedProduct

      setTimeout(
        () => {
          delete idempotencyStore[res.locals.idempotencyKey] // Auto-cleanup
        },
        5 * 60 * 1000,
      ) // 5 minutes

      res.status(200).json({
        status: "success",
        message: "product updated",
        data: updatedProduct,
      })
    } catch (e: any) {
      next(e)
    }
  }

  async deleteProduct(
    req: Request<DeleteProductRequest["params"]>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params
      if (!mongoose.isValidObjectId(id)) {
        throw new ApiError("invalid product id", 400)
      }

      await this.productService.deleteProduct(id)
      res.status(200).json({
        status: "success",
        message: "product deleted",
      })
    } catch (e: any) {
      next(e)
    }
  }
}

// Resolve the controller using the container
const productController = container.resolve(ProductController)
export default productController
