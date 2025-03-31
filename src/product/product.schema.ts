import { z } from "zod"

export const CreateProductRequestSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "product name must be of type: string",
      required_error: "product name is required",
    }),
    category: z.string({
      invalid_type_error: "product category name must be of type: string",
      required_error: "product category is required",
    }),
    price: z.number({
      invalid_type_error: "product price must be of type: number",
      required_error: "product price is required",
    }),
    description: z.string({
      invalid_type_error: "product description must be of type: string",
      required_error: "product description is required",
    }),
  }),
})

export const GetProductsRequestSchema = z.object({
  query: z.object({
    productCount: z.string({
      invalid_type_error: "product count must be of type: string",
      required_error: "product count is required",
    }),
  }),
})

export const GetProductRequestSchema = z.object({
  params: z.object({
    id: z.string({
      invalid_type_error: "product id must be of type: string",
      required_error: "product id is required",
    }),
  }),
})

export const UpdateProductRequestSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "product name must be of type: string",
        required_error: "product name is required",
      })
      .optional(),
    category: z
      .string({
        invalid_type_error: "product category name must be of type: string",
        required_error: "product category is required",
      })
      .optional(),
    price: z
      .number({
        invalid_type_error: "product price must be of type: number",
        required_error: "product price is required",
      })
      .optional(),
    description: z
      .string({
        invalid_type_error: "product description must be of type: string",
        required_error: "product description is required",
      })
      .optional(),
  }),
  params: z.object({
    id: z.string({
      invalid_type_error: "product id must be of type: string",
      required_error: "product id is required",
    }),
  }),
})

export const deleteProductRequestSchema = z.object({
  params: z.object({
    id: z.string({
      invalid_type_error: "product id must be of type: string",
      required_error: "product id is required",
    }),
  }),
})

export type CreateProductRequest = z.infer<typeof CreateProductRequestSchema>
export type GetProductsRequest = z.infer<typeof GetProductsRequestSchema>
export type GetProductRequest = z.infer<typeof GetProductRequestSchema>
export type UpdateProductRequest = z.infer<typeof UpdateProductRequestSchema>
export type DeleteProductRequest = z.infer<typeof deleteProductRequestSchema>
