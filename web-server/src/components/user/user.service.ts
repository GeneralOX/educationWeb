import mongoose from "mongoose";
import UserModel from "../../models/user";

const create = async ({ name, username, password }) => {
    const user = await UserModel.create({
        name,
        username,
        password
    })
    return user;
}
const findAll = async () => {
    return await UserModel.find();
}
const findById = async (id: string) => {
    return await UserModel.findById(id);
}
const findByUsername = async (username: string) => {
    return await UserModel.findOne({ username });
}
const findGroup = async (ids: any[]) => {
    const objectIds = ids.map((v) => new mongoose.Types.ObjectId(v));
    return await UserModel.find({
        _id: { $in: objectIds }
    }).select("-password").select("-courses").select("-events");
}
const addCourse = async ({ id, course }) => {
    const userById = await UserModel.findById(id);
    userById?.courses.push(course);
    await userById!.save();

    return userById;
}


export default {
    create,
    findAll,
    findById,
    findByUsername,
    findGroup,
    addCourse
}