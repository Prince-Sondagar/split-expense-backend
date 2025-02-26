import Group from "../models/groupModel";
import { IGroup, IUser } from "../types";
import { cloudinaryImageRemove } from "./cloudinaryServices";


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
    const groups = await Group.find({ createdBy: userId }).populate(['members', 'createdBy']);
    return groups;
};


export const updateGroupService = async (group_dto: IGroup, groupId: string) => {
    const updatedGroup = await Group.findByIdAndUpdate({ _id: groupId }, group_dto, { new: true });
    return updatedGroup;
};

export const deleteGroupService = async (groupId: string) => {
    const deletedGroup = await Group.findByIdAndDelete(groupId);

    if (deletedGroup?.groupImage) {
        await cloudinaryImageRemove(deletedGroup?.groupImage);
    }
    return deletedGroup;
};