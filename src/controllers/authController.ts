import { NextFunction } from 'express';
import { createUserService, loginService } from '../services/authServices';

export const registrationController = async (req: any, res: any, next: NextFunction) => {
    try {
        const result = await createUserService(req.body);
        if (result) {
            return res.status(201).send({ message: "Registration successfully" });
        }
    } catch (error: any) {
        console.log("Error in registration controller:", error)
        next(error);
    }
}

export const LoginController = async (req: any, res: any, next: NextFunction) => {
    try {
        const result = await loginService(req.body);
        if (result) {
            return res.status(201).send(result)
        }
    } catch (error: any) {
        console.log("Error in LoginHandler:", error);
        next(error)
    }
}