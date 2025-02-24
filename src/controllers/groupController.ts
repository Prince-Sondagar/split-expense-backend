import { NextFunction } from "express";
import fs from 'fs';
import { createGroupService, getGroup } from "../services/groupServices";
import { IGroup } from "../types";
import { cloudinaryImageUpload } from "../services/cloudinaryServices";
import { ErrorResponse } from "../middleware/errorHandler";


export const createGroupController = async (req: any, res: any, next: NextFunction) => {
    try {
        const currentUser = req.user;
        let group_details: IGroup = JSON.parse(req?.body?.group_details);

        const whereQuery = { title: group_details?.title, createdBy: currentUser?._id };
        const groupExist = await getGroup(whereQuery);

        if (groupExist) {
            if (req?.file?.path) fs.unlinkSync(req?.file?.path);
            throw new ErrorResponse("Group Already exist with this title", 400);
        }

        if (req?.file) {
            group_details.groupImage = await cloudinaryImageUpload(req.file.path) as string;

            req?.file?.path && fs.unlinkSync(req?.file?.path);
        }

        const result = await createGroupService(group_details, currentUser);

        res.status(201).send({ message: "Group created successfully!", group: result });

    } catch (error) {
        console.error("Error in createGroupController:", error);
        const existFile = fs.existsSync(req?.file?.path);
        if (existFile) {
            fs.unlinkSync(req?.file?.path);
        }
        next(error);
    }
};


export const viewGroupController = () => {

};