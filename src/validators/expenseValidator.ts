import { body } from "express-validator";
import { ErrorResponse } from "../middleware/errorHandler";
import mongoose from "mongoose";
import { getGroup } from "../services/groupServices";


export const createExpenseValidator = [
    body('amount').notEmpty().withMessage("Amount is required"),
    body('amount').exists().custom((value) => {
        if (value < 0) {
            throw new ErrorResponse("amount should be grater than 0", 400);
        }
    }),
    body('splitBetween').notEmpty().withMessage("members is required for split expense"),
    body('splitBetween').exists().custom((value) => {
        if (value.splitBetween.length < 1) {
            throw new ErrorResponse("At least one member is required for the split expense", 400);
        }
    }),
    body('group').notEmpty().withMessage("Group Id is required"),
    body('group').exists().custom((value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error("Invalid format of Group Id");
        }

        const group = getGroup({ _id: value });

        if (!group) {
            throw new ErrorResponse("Group does not exist with this Id", 400);
        }
    })
];

// export const createGroupValidator = [
//     body("group_details").
//         notEmpty().withMessage("Group details is required!")
//         .custom((value) => {
//             try {
//                 value && JSON.parse(value);
//             } catch (error) {
//                 throw new ErrorResponse("Invalid JSON format in group_details!", 400);
//             }
//             return true;
//         }),
//     body("group_details").exists()
//         .custom(async (value) => {
//             await groupDetailsValidation(value);
//         })
// ];