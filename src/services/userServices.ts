import { ErrorResponse } from "../middleware/errorHandler";
import UserModel from "../models/userModel";

export const getUser = (whereQuery: any) => {
    try {
        const user = UserModel.findOne(whereQuery);
        if (!user) {
            throw new ErrorResponse('User not found!', 400);
        }
        return user;
    } catch (error: any) {
        console.log("Error in getUser:", error);
        throw new Error(error);
    }
};