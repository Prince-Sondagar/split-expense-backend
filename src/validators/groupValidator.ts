import { body } from "express-validator";

export const createGroupValidator = [
    body('title').notEmpty().withMessage("Title is required"),
    body('members').isArray({ min: 1 }).withMessage("Members is required"),
    body('members.*').isString().withMessage("Each member must be an integer")
];