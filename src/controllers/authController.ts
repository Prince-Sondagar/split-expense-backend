import { NextFunction } from 'express';
import { createUser } from '../services/authServices';

export const registrationController = async (req: any, res: any, next: NextFunction) => {
    try {
        const result = await createUser(req.body);
        if (result) {
            return res.status(201).send({ message: "Registration successfully" });
        }
    } catch (error: any) {
        console.log("Error in registration controller:", error)
        next(error);
    }
}