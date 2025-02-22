import { ErrorResponse } from "../middleware/errorHandler";
import Group from "../models/groupModel";
import { IGroup, IUser } from "../types";


export const createGroupService = async (group_details: IGroup, currentUser: IUser) => {
    const { title, members, groupImage } = group_details;
    const whereQuery = { title, createdBy: currentUser?._id };
    const groupExist = await getGroup(whereQuery);

    if (groupExist) {
        throw new ErrorResponse("Group Already exist with this title", 400);
    }

    const group = new Group({ title, members, groupImage, createdBy: currentUser._id });
    await group.save();

    return group;
};



export const getGroup = async (whereQuery: any) => {
    const group = await Group.findOne(whereQuery);

    // if (!group) {
    //     throw new ErrorResponse("Group not found!", 400);
    // }
    return group;
};