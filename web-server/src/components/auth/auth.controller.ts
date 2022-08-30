import { Request, Response } from "express";
import { signJwt } from "../../middleware/jwt";
import userService from "../user/user.service";


const register = async (req: Request, res: Response) => {
    const { name, username, password } = req.body;
    const user = await userService.create({ name, username, password });
    return res.json({ success: true })
}
const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await userService.findByUsername(username);
    console.log(user)
    if (user != null) {
        if (user.password == password) {
            if (!user.status)
                return res.json({ success: false, message: "account unavailable, contact admin" })
            const signToken = signAccessToken(user.toObject());
            const payload: any = (user.toJSON())
            payload.token = signToken;
            return res.json({ success: true, payload });
        }
        // return res.status(401).json({ success: false, data: { message: "invalid credentials" } });
        // if (user.password == password) {
        //     return res.json({ success: true, user })
        // }
    }
    return res.json({ success: false, message: "invalid credential" })
}

const signAccessToken = (user: any) => {
    const accessToken = signJwt(user, process.env.ACCESS_TOKEN_PRIVATE_KEY!, { expiresIn: "1y" });
    return accessToken;
}

export default {
    register,
    login
}