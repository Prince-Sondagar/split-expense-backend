import { NextFunction } from "express";
import { ErrorResponse } from "./errorHandler";



const AuthMiddleWare = (req: any, res: any, next: NextFunction) => {
    try {
        console.log("req --->", req.headers);
        const token = req.headers['authorization'].split(' ')[1];
        console.log("token --->", token);

        if (!token) {
            throw new ErrorResponse("Token is required", 401);
        }


    } catch (error) {
        next(error);
    }
};

export default AuthMiddleWare;