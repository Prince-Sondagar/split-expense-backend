import { body, param } from "express-validator";
import User from "../models/userModel";
import mongoose from "mongoose";
import { ErrorResponse } from "../middleware/errorHandler";

export const createGroupValidator = [
    body("group_details").
        notEmpty().withMessage("Group details is required!")
        .custom((value) => {
            try {
                value && JSON.parse(value);
            } catch (error) {
                throw new ErrorResponse("Invalid JSON format in group_details!", 400);
            }
            return true;
        }),
    body("group_details")
        .custom(async (value) => {
            const groupDetails = value && JSON.parse(value);

            if (!groupDetails?.title || typeof groupDetails?.title !== "string") {
                throw new ErrorResponse("Group title is required and must be a string!", 400);
            }

            if (!Array.isArray(groupDetails?.members) || groupDetails?.members?.length < 1) {
                throw new ErrorResponse("At least one member is required and must be an array!", 400);
            }

            for (const memberId of groupDetails?.members) {
                if (!mongoose.Types.ObjectId.isValid(memberId)) {
                    throw new ErrorResponse(`Invalid member ID: ${memberId}`, 400);
                }
            }

            const membersObjectId = groupDetails?.members?.map((id: any) => new mongoose.Types.ObjectId(id));
            const existingUsers = await User.find({ _id: { $in: membersObjectId } }).select("_id");

            const existingIds = existingUsers?.map(user => user?._id.toString());
            const invalidIds = groupDetails?.members?.filter((id: any) => !existingIds?.includes(id));

            if (invalidIds?.length > 0) {
                throw new ErrorResponse(`The following member IDs do not exist: ${invalidIds.join(", ")}`, 400);
            }
            return true;
        })
];


export const viewSpecificGroupValidator = [
    param('id').notEmpty().withMessage("Id is required!")
];