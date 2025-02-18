import { body } from "express-validator";

export const userRegistrationValidator = [
    body("firstName").notEmpty().withMessage("First Name is required"),
    body("lastName").notEmpty().withMessage("Last Name is required"),
    body('email').notEmpty().withMessage("Email is required"),
    body('mobileNumber').isMobilePhone("any").withMessage("Valid  Mobile number  is required"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
]

export const userLoginValidator = [
    body("mobileNumber").isMobilePhone("any").withMessage('Valid Mobile number is required'),
    body('password').isLength({ min: 6 }).withMessage("Password is required or must be 6 character long")
]