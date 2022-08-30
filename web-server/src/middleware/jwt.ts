import jwt from "jsonwebtoken";

export function signJwt(object: Object, keyName: string, options?: jwt.SignOptions | undefined) {
    const signingKey = Buffer.from(keyName, "base64").toString("ascii");
    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: "RS256"
    });
}

export function verifyJwt<T>(token: string, keyName: string): T | null {

    const publicKey = Buffer.from(keyName, "base64").toString("ascii");

    try {
        const decoded = jwt.verify(token, publicKey) as T;
        return decoded;
    } catch (e: any) {
        return null;
    }
}