import mongoose, { model, Schema } from "mongoose";
import { IGroup } from "../types";


const groupSchema = new Schema<IGroup>({
    title: {
        require: true,
        type: String,
    },
    groupImage: {
        type: String,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    expenses: [{
        type: mongoose.Types.ObjectId,
        ref: "Expense"
    }],
    members: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
}, { timestamps: true });

const Group = model<IGroup>("Group", groupSchema);

export default Group;