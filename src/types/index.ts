import mongoose from "mongoose";

export interface IUser {
    firstName: string,
    lastName: string,
    emai: string,
    mobileNumber: string,
    password: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IGroup {
    _id: string;
    title: string;
    members: mongoose.Types.ObjectId[] | IUser[];
    expenses: mongoose.Types.ObjectId[] | IExpense[];
    createdBy: mongoose.Types.ObjectId | IUser;
    groupImage?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IExpense {
    _id: string;
    title: string;
    amount: number;
    payer: mongoose.Types.ObjectId | IUser;
    splitBetween: { user: mongoose.Types.ObjectId | IUser; status: "pending" | "paid"; }[];
    group: mongoose.Types.ObjectId | IGroup;
    createdAt: Date;
    updatedAt: Date;
}


