import UserModel from "../models/userModel";

export const getUser = (whereQuery: any) => {
    try {
        const user = UserModel.findOne(whereQuery);
        return user;
    } catch (error: any) {
        console.log("Error in getUser:", error)
        throw new Error(error);
    }
}