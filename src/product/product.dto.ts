export interface CreateProductRequestDto {
  name: string
  category: string
  price: number
  description: string
}

export interface CreateProductResponseDto {
  _id: string
  name: string
  category: string
  price: number
  description: string
  createdAt: Date
}
