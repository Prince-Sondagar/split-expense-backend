import { NextFunction } from "express";
import { createGroupService } from "../services/groupServices";


export const createGroupController = async (req: any, res: any, next: NextFunction) => {
    try {
        await createGroupService(req?.body);
        res.status(201).send({ message: "Group created successfully!" });
    } catch (error) {
        console.log("Error in createGroupController:", error);
        next(error);
    }
};