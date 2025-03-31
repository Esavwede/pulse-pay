/* eslint-disable no-useless-catch */
/* eslint-disable import/prefer-default-export */
import { autoInjectable, inject } from "tsyringe"
import { CreateProductRequestDto } from "./product.dto"
import { ProductRepo } from "./product.repo"

@autoInjectable()
export class ProductService {
  constructor(@inject(ProductRepo) private productRepo: ProductRepo) {}

  async create(product: CreateProductRequestDto) {
    const createdProduct = await this.productRepo.create(product)
    return createdProduct
  }

  async getProducts(productCount: number, productSkip: number) {
    const products = await this.productRepo.getProducts(
      productCount,
      productSkip,
    )
    return products
  }

  async getProduct(_id: string) {
    const product = await this.productRepo.getProduct(_id)
    return product
  }

  async updateProduct(_id: string, updates: any) {
    const product = await this.productRepo.updateProduct(_id, updates)
    return product
  }

  async deleteProduct(_id: string) {
    await this.productRepo.deleteProduct(_id)
  }
}
