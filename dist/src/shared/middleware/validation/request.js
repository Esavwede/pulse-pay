"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = validateRequest;
function validateRequest(schema) {
    return (req, res, next) => {
        const result = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        if (!result.success) {
            const e = result.error.issues;
            const errs = [];
            e.forEach((errorObj) => {
                errs.push(errorObj.message);
            });
            res.status(400).json({
                message: "bad request",
                success: false,
                errors: errs,
            });
            return;
        }
        next();
    };
}
