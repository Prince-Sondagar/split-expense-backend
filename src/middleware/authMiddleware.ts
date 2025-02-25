import { NextFunction } from "express";
import { ErrorResponse } from "./errorHandler";
import jwt from 'jsonwebtoken';
import { getUser } from "../services/userServices";


const AuthMiddleWare = async (req: any, res: any, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers && req.headers['authorization'];

        if (!authorizationHeader) {
            throw new ErrorResponse('Authorization header is required OR invalid authorization header', 400);
        }

        const token = authorizationHeader?.split(' ')[1];

        if (!token) {
            throw new ErrorResponse("Authorization token is required.", 401);
        }

        const decode: any = jwt.verify(token, process.env.JWT_SECRET as string);

        if (!decode) {
            throw new ErrorResponse('Invalid token.', 401);
        }

        req.user = await getUser({ _id: decode?.userId });

        next();
    } catch (error) {
        next(error);
    }
};

export default AuthMiddleWare;