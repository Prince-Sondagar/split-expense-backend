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

export const getGroup = async (whereQuery: any) => {
    const group = await Group.findOne(whereQuery);
    return group;
};