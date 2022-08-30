import { Request, Response } from "express";
import joinedCourse from "../common/joinedCourse";
import courseService from "../course/course.service";
import userService from "./user.service";

const findAll = async (req: Request, res: Response) => {
    const users = await userService.findAll();
    return res.send(users);
}

const accept = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await userService.findById(id);
    if (user) {
        user.status = true;
        user.save();
        return res.json({ success: true, user });
    }
    return res.json({ success: false, message: "try again" });

}

const remove = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await userService.findById(id);
    if (user) {
        user?.delete();
        user?.save();

        return res.json({ success: true, user });
    }
    return res.json({ success: false, message: "try again" });

}

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const user = await userService.findById(id);
    if (user) {
        user.name = data.name;
        user.username = data.username;
        user.password = data.password;
        user.role = Number(data.role);
        user?.save();

        return res.json({ success: true, user });
    }
    return res.json({ success: false, message: "try again" });

}

const findOne = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = (await userService.findById(id));

    const joined = await joinedCourse.find({ user });
    const course = (await courseService.findGroup(joined.map((v) => v.course?._id)))
        .map((v) => {
            let status = joined.filter((r: any) => v._id.toString() == r.course.toString())[0].status;
            return Object.assign(v.toObject(), { status })
        })
    return res.send({ user, course });
}
export default {
    findAll,
    findOne,
    remove,
    accept,
    update
}