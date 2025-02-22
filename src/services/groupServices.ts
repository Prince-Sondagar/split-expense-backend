import Group from "../models/groupModel";
import { IGroup, IUser } from "../types";


export const createGroupService = async (group_details: IGroup, currentUser: IUser) => {
    const { title, members, groupImage } = group_details;
    
    const group = new Group({ title, members, groupImage, createdBy: currentUser._id });
    await group.save();
    return group;
};