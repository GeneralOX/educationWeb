import JoinedCourseModel from "../../models/joinedCourse"

const joinCourse = async ({ user, course }) => {
    const join = await JoinedCourseModel.create({
        user: user,
        course: course,
        status: false
    })
    return join;
}
const acceptJoin = async ({ user, course }) => {
    await JoinedCourseModel.updateOne(
        { user, course },
        { status: true }
    );
}
const disjoinCourse = async ({ user, course }) => {
    const disJoin = await JoinedCourseModel.deleteOne({
        user: user,
        course: course,
    })
    return disJoin;
}
const clearCourse = async ({ course }) => {
    const clear = await JoinedCourseModel.deleteMany({
        course: course,
    })
    return clear;
}

const find = async (obj: any) => {
    return await JoinedCourseModel.find({ obj });
}

const CourseParticipant = async (obj: any) => {
    const j = (await JoinedCourseModel.find(obj))
    if (j.length == 0)
        return []
    return j;
}


export default {
    find,
    joinCourse,
    acceptJoin,
    disjoinCourse,
    clearCourse,
    CourseParticipant
}