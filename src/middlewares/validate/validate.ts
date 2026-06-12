import {NextFunction, Request, Response} from "express";
import { ZodObject } from "zod";

export const validate = (schema: ZodObject<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        })
        next()
    } catch (error) {
        res.status(400).json(error)
    }

}