import { NextFunction } from "express";
import { createGroupService } from "../services/groupServices";


export const createGroupController = async (req: any, res: any, next: NextFunction) => {
    try {
        const currentUser = req.user;
        const result = await createGroupService(req?.body, currentUser);
        res.status(201).send({ message: "Group created successfully!", group: result });
    } catch (error) {
        console.log("Error in createGroupController:", error);
        next(error);
    }
};