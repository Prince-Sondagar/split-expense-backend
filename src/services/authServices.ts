import { ErrorResponse } from "../middleware/errorHandler";
import User from "../models/userModel";
import { generateToken } from "../utils";
import { getUser } from "./userServices";
import bcrypt from 'bcrypt';

export const createUserService = async (data: any) => {
    const { firstName, lastName, email, mobileNumber, password } = data;

    const isUserExist = await getUser({ mobileNumber });

    if (isUserExist) {
        throw new ErrorResponse("User alreay exist with this mobile number", 400);
        // return res.status(400).send({ message: "User alreay exist with this mobile number" })
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNumber: mobileNumber,
        emai: email,
        password: hashPassword
    });

    await user.save();
    return user;
};

export const loginService = async (loginData: any) => {
    const { mobileNumber, password } = loginData;

    const user = await getUser({ mobileNumber });

    if (!user) {
        throw new ErrorResponse('User Not found', 404);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password as string);
    if (!isPasswordMatch) {
        throw new ErrorResponse("Invalid password", 400);
    }

    const token = generateToken(user._id.toString());

    return { message: "Login Successfull", token, user };
};