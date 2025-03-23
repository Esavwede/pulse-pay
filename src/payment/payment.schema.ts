import { z } from "zod"

export const PaymentRequestSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
        required_error: "Name is required",
      })
      .min(2)
      .max(255),
    email: z
      .string({
        invalid_type_error: "Email must be a valid email",
        required_error: "Email is required",
      })
      .email(),
    amount: z
      .number({
        invalid_type_error: "Amount must be a positive number greater than 0",
        required_error: "Amount is required",
      })
      .min(1)
      .positive(),
  }),
})

export type PaymentRequest = z.infer<typeof PaymentRequestSchema>
