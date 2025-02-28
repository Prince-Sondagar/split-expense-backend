import { NextFunction } from "express";


export const createExpenseController = (req: any, res: any, next: NextFunction) => {
    try {
        const currentUser= req.user
        const expense_payload = req.body;



    } catch (error) {
        next(error);
    }
};