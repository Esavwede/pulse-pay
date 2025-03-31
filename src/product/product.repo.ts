/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { injectable } from "tsyringe"
import mongoose from "mongoose"
import ProductModel from "./product.model"
import { CreateProductRequestDto } from "./product.dto"
import logger from "../core/logging/logger"
import ApiError from "../shared/utils/ApiError"

@injectable()
export class ProductRepo {
  async create(product: CreateProductRequestDto) {
    try {
      const newProduct = new ProductModel(product)

      const createdProduct = await newProduct.save()
      logger.info("ProductRepo: Product created")
      return createdProduct.toObject()
    } catch (e: any) {
      if (e?.code === 11000) {
        logger.error(e.message, "Duplicate key error detected:")
        throw new ApiError("product exists", 400)
      }
      logger.error(e, "database error")
      throw new ApiError("server error", 500)
    }
  }

  async getProducts(productCount: number, productSkip: number) {
    try {
      const products = await ProductModel.find()
        .skip(productSkip)
        .limit(productCount)
        .lean()
      return products
    } catch (e: any) {
      logger.error(e, "database error")
      throw new ApiError("server error", 500)
    }
  }

  async getProduct(_id: string) {
    try {
      const product = await ProductModel.findOne({ _id })
      return product
    } catch (e: any) {
      logger.error(e, "database error")
      throw new ApiError("server error", 500)
    }
  }

  async updateProduct(_id: string, updates: any) {
    const objectId = new mongoose.Types.ObjectId(_id)
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: objectId },
      updates,
      { new: true, runValidators: true },
    )

    if (!updatedProduct) {
      throw new ApiError("product not found", 404)
    }
    console.log(updatedProduct)
    return updatedProduct
  }

  async deleteProduct(_id: string) {
    const result = await ProductModel.deleteOne({ _id })
    if (result.deletedCount < 1) {
      throw new ApiError("product not found", 400)
    }
  }
}
