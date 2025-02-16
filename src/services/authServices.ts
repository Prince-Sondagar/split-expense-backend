import { nextTick } from "process";
import { ErrorResponse } from "../middleware/errorHandler";
import UserModel from "../models/userModel";
import { getUser } from "./userServices";
import bcrypt from 'bcrypt';

export const createUser = async (data: any) => {
    const { firstName, lastName, email, mobileNumber, password } = data;

    const isUserExist = await getUser({ mobileNumber });

    if (isUserExist) {
        throw new ErrorResponse("User alreay exist with this mobile number", 400)
        // return res.status(400).send({ message: "User alreay exist with this mobile number" })
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = new UserModel({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNumber: mobileNumber,
        emai: email,
        password: hashPassword
    });

    await user.save();
    return user;
}