import { Request, Response } from "express";
import eventService from "./event.service";

const findAll = async (req: Request, res: Response) => {
    const events = await eventService.findAll();
    res.json({ events })
}

const findOne = async (req: Request, res: Response) => {
    const id = req.params.id;
    const event = await (await eventService.findById(id))?.populate("owner");
    res.json({ event });
}

const eventsByUser = async (req: Request, res: Response) => {
    const user = req.params;
    const id = user.id;

    const events = await eventService.findByUser(id);
    res.json({ events })
}

const create = async (req: Request, res: Response) => {
    const user = req.params;
    const id = user.id;
    const { title, subtitle, imgUrl } = req.body;

    const event = await eventService.create({ id, title, subtitle, imgUrl });
    return res.json({ event });
}

const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const event = await eventService.findById(id);
    if (event) {
        event.title = data.title;
        event.subtitle = data.subtitle;
        event.imgUrl = data.imgUrl;
        event?.save();

        return res.json({ success: true, event });
    }
    return res.json({ success: false, message: "try again" });

}

const remove = async (req: Request, res: Response) => {
    const eventId = req.params.id;
    await eventService.remove(eventId);
    res.send({ deleted: true })
}

export default {
    findAll,
    findOne,
    eventsByUser,
    create,
    remove,
    update
}