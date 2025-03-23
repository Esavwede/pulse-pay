import { AnyZodObject } from "zod"
import { Request, Response, NextFunction, RequestHandler } from "express"

export default function validateRequest(schema: AnyZodObject): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    })

    if (!result.success) {
      res.status(400).json({
        errors: result.error.issues,
      })
      return
    }

    next()
  }
}
