import mongoose from "mongoose";
import eventModel from "../../models/event";

const findAll = async () => {
    return await eventModel.find();
}
const findById = async (id) => {
    return await eventModel.findById(id);
}
const findByUser = async (id: string) => {
    return await eventModel.find({ owner: id });
}
const findGroup = async (ids: any[]) => {
    const objectIds = ids.map((v) => new mongoose.Types.ObjectId(v));
    return await eventModel.find({
        _id: { $in: objectIds }
    });
}
const create = async ({ id, title, subtitle, imgUrl }) => {
    const event = await eventModel.create({
        title,
        subtitle,
        imgUrl,
        owner: id
    });
    await event.save();
    return event;
}
const remove = async (id: any) => {
    const event = await eventModel.findById(id);
    event?.delete();
    return event;
}

export default {
    findAll,
    findById,
    findByUser,
    findGroup,
    create,
    remove
}