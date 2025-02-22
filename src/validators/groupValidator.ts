import { body } from "express-validator";
import User from "../models/userModel";
import mongoose from "mongoose";
import { ErrorResponse } from "../middleware/errorHandler";

export const createGroupValidator = [
    body("title").notEmpty().withMessage("Title is required"),
    body("members").isArray({ min: 1 }).withMessage("Members is required"),
    body("members").custom(async (value) => {
        const invalidFormatId = value.find((v: any) => typeof v !== 'string');

        if (invalidFormatId) {
            throw new ErrorResponse(`Invalid member ID: ${invalidFormatId}. Member ID must be a string.`, 400);
        }

        const membersId = value.map((id: any) => new mongoose.Types.ObjectId(id));

        const result = await User.aggregate([
            { $match: { _id: { $in: membersId } } },
            { $group: { _id: null, foundIds: { $push: "$_id" } } },
            { $project: { invalidIds: { $setDifference: [membersId, "$foundIds"] }, _id: 0 } }
        ]);

        const invalidIds = result.length > 0 ? result[0].invalidIds.map((id: any) => id.toString()) : [];


        if (invalidIds.length > 0) {
            throw new ErrorResponse(
                `The following member IDs do not exist in the system: ${invalidIds.join(", ")}. Please provide valid User IDs.`
                , 400);
        }
        return true;
    })
];