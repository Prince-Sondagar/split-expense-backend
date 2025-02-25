import { NextFunction } from "express";
import fs from 'fs';
import { createGroupService, getAllGroupsService, getGroup } from "../services/groupServices";
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

        return res.status(201).send({ message: "Group created successfully!", group: result });

    } catch (error) {
        console.error("Error in createGroupController:", error);
        const existFile = fs.existsSync(req?.file?.path);
        if (existFile) {
            fs.unlinkSync(req?.file?.path);
        }
        next(error);
    }
};


export const getGroupByIdController = async (req: any, res: any, next: NextFunction) => {
    try {
        const groupId = req.params.id;
        const group = await getGroup({ _id: groupId }, ["createdBy", "members"]);
        return res.status(200).send({ message: "Group details fetched successfully!", group: group });
    } catch (error) {
        console.log("Error in viewGroupController:", error);
        next(error);
    }
};

export const getAllGroupsController = async (req: any, res: any, next: NextFunction) => {
    try {
        const currentUser = req.user;

        const result = await getAllGroupsService(currentUser?._id);
        return res.send({ message: "Groups fetched successfully!", groups: result });
    } catch (error) {
        console.log("Error in getAllGroupsController:", error);
        next(error);
    }
};


export const updateGroupController = async (req: any, res: any) => {
    try {
        const groupImage = req.file;
        // const parsedData = req.body && JSON.parse(req.body);
        console.log("Call ---->", req.body);
        return;
    } catch (error) {
        console.log("Error in updateGroupController:", error);
        // next(error);
    }
};