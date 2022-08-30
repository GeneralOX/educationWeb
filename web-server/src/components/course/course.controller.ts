import { Request, Response } from "express";
import joinedCourse from "../common/joinedCourse";
import userService from "../user/user.service";
import courseService from "./course.service";

const findAll = async (req: Request, res: Response) => {
    const courses = (await courseService.findAll());
    new Promise(async (resolve) => {
        const result: any[] = [];
        for (let i = 0; i < courses.length; i++) {
            let r: any = courses[i].toObject();
            const usersIds = await joinedCourse.CourseParticipant({ course: r._id });
            r.participants = usersIds.filter((b) => b != null).length;
            result.push(r)
            console.log(usersIds)
        }
        resolve(result);
    }).then((r: any) => {
        res.json({ courses: r })
    })
}

const findOne = async (req: Request, res: Response) => {
    const id = req.params.id;
    const course = await (await courseService.findById(id))?.populate("owner");
    const usersIds = (await joinedCourse.find({ course }))
        .map((v) => v.user?._id);
    const users = await userService.findGroup(usersIds);
    res.json({ course, users });
}

const coursesByUser = async (req: Request, res: Response) => {
    const user = req.params;
    const id = user.id;
    new Promise(async (resolve) => {
        const courses: any[] = [];
        const crs = (await courseService.findByUser(id));

        for (let i = 0; i < crs.length; i++) {
            let r: any = crs[i].toObject();
            const usersIds = await joinedCourse.CourseParticipant({ course: r._id });
            r.participants = usersIds.length;
            courses.push(r)
        }
        resolve(courses);
    }).then((r: any) => {

        res.json({ courses: r })
    })

}

const create = async (req: Request, res: Response) => {
    const user = req.params;
    const id = user.id;
    const { title, subtitle, places, imgUrl } = req.body;

    const course = await courseService.create({ id, title, subtitle, places, imgUrl });
    return res.json({ course });
}

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const course = await courseService.findById(id);
    if (course) {
        course.title = data.title;
        course.subtitle = data.subtitle;
        course.places = data.places;
        course.imgUrl = data.imgUrl;
        course?.save();

        return res.json({ success: true, course });
    }
    return res.json({ success: false, message: "try again" });

}

const remove = async (req: Request, res: Response) => {
    const courseId = req.params.id;

    const course = await courseService.remove(courseId);
    await joinedCourse.clearCourse({ course });
    res.send({ deleted: true })
}

const join = async (req: Request, res: Response) => {
    const courseId = req.params.id;
    const userId = req.body.uid;

    const course = await courseService.findById(courseId);
    const user = await userService.findById(userId);

    const exist = await joinedCourse.find({ user, course });
    if (exist) {
        return res.json({ message: "You already joined the course" });
    }
    await joinedCourse.joinCourse({ user, course });
    return res.json({ message: "Welcome to the course!" });
}

const participant = async (req: Request, res: Response) => {
    const id = req.params.id;
    const usersIds = await joinedCourse.CourseParticipant({ course: id });
    const users = await userService.findGroup(usersIds.map(v => v.user));

    return res.json({ users, usersIds })
}

export default {
    findAll,
    findOne,
    coursesByUser,
    create,
    remove,
    update,
    join,
    participant
}