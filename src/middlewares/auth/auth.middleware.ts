import 'dotenv/config'
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {ProtectedRequest, UserPayload} from "./types.js";


export const authMiddleware = (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        res.status(401).json({ message: 'Not authorized!' });
        return;
    }

    const token = bearerToken.slice('Bearer '.length);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
        req.user = { id: decoded.id, email: decoded.email}
        next();
    } catch (error) {
        console.error('невалидный токен', error);
        res.status(401).json({ message: 'Not authorized!' });
    }

}