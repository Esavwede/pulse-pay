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
            res.status(400).json({
                errors: result.error.issues,
            });
            return;
        }
        next();
    };
}
