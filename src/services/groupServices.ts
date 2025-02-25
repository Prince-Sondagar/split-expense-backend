import { ErrorResponse } from "../middleware/errorHandler";
import Group from "../models/groupModel";
import { IGroup, IUser } from "../types";


export const createGroupService = async (group_dto: IGroup, currentUser: IUser) => {
    const { title, members, groupImage } = group_dto;

    const group = new Group({
        title,
        members,
        groupImage,
        createdBy: currentUser._id
    });
    await group.save();

    return group;
};

export const getGroup = async (whereQuery: any, populateFields: string[] = []) => {
    let query = Group.findOne(whereQuery);

    if (populateFields.length > 0) {
        populateFields?.forEach((field) => {
            query = query.populate(field);
        });
    }

    const group = await query;
    return group;
};


export const getAllGroupsService = async (userId: string) => {
    const groups = await Group.find({ createdBy: userId }).populate(['members','createdBy']);
    return groups;
};