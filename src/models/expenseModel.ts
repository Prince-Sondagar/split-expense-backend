import mongoose, { model, Schema } from "mongoose";
import { IExpense } from "../types";


const expenseSchema = new Schema<IExpense>({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payer: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    splitBetween: [{
        user: { type: mongoose.Types.ObjectId, ref: "User" },
        expense: { type: Number, require: true },
        status: { type: String, enum: ["pending", "paid"], default: "pending" }
    }],
    group: {
        type: mongoose.Types.ObjectId,
        ref: "Group"
    }
}, { timestamps: true });

const Expense = model<IExpense>('Expense', expenseSchema);

export default Expense;