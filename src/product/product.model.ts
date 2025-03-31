import mongoose, { Schema, Document } from "mongoose"

export interface Product extends Document {
  name: string
  category: string
  price: number
  stock_status: string
  sku: string
  description: string
  createdAt: Date
  updatedAt: Date
}
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock_status: {
      type: String,
      required: true,
      default: "in_stock",
    },
    sku: {
      type: String,
      required: true,
      default: "fadfafad",
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

// eslint-disable-next-line func-names
ProductSchema.pre("save", function (next) {
  if (!this.sku) {
    const uniqueId = Math.random().toString(36).substring(2, 8).toUpperCase()
    this.sku = `${this.category.substring(0, 3).toUpperCase()}-${uniqueId}`
  }
  next()
})

const ProductModel = mongoose.model<Product>("product", ProductSchema)
export default ProductModel
