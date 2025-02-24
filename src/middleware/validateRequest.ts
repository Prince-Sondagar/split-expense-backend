import { NextFunction, Request, Response } from "express";
import { ContextRunner, validationResult } from "express-validator";
import { ErrorResponse } from "./errorHandler";


export const validateRequest = (validations: ContextRunner[]) => async (req: Request, res: Response, next: NextFunction) => {

    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => err.msg);
        return next(new ErrorResponse(extractedErrors.join(", "), 400));
    }
    next();
};