import mongoose from "mongoose";
import CourseModel from "../../models/course";

const findAll = async () => {
    return await CourseModel.find();
}
const findById = async (id) => {
    return await CourseModel.findById(id);
}
const findByUser = async (id: string) => {
    return await CourseModel.find({ owner: id });
}
const findGroup = async (ids: any[]) => {
    const objectIds = ids.map((v) => new mongoose.Types.ObjectId(v));
    return await CourseModel.find({
        _id: { $in: objectIds }
    });
}
const create = async ({ id, title, subtitle, places, imgUrl }) => {
    const course = await CourseModel.create({
        title,
        subtitle,
        places,
        imgUrl,
        owner: id
    });
    await course.save();
    return course;
}
const remove = async (id: any) => {
    const course = await CourseModel.findById(id);
    course?.delete();
    return course;
}

export default {
    findAll,
    findById,
    findByUser,
    findGroup,
    create,
    remove
}