import { NextFunction } from "express";
import { createGroupService } from "../services/groupServices";


export const createGroupController = async (req: any, res: any, next: NextFunction) => {
    try {
        const currentUser = req.user;
        console.log("currentUser -- >", currentUser._id);
        // const result = await createGroupService(req?.body, currentUser);
        res.status(201).send({ message: "Group created successfully!", });
    } catch (error) {
        console.log("Error in createGroupController:", error);
        next(error);
    }
};