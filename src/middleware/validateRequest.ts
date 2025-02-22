import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorResponse } from "./errorHandler";


export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => err.msg);
        return next(new ErrorResponse(extractedErrors.join(", "), 400));
    }
    next();
};