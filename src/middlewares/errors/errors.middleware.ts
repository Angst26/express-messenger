import {NextFunction, Request, Response,} from "express";
import {HttpException} from "../../exceptions/HttpException.js";


export const errorsMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction) => {
    if(error instanceof HttpException){
        res.status(error.statusCode).json({
            message: error.message,
            status: error.statusCode,
        });
    }

    res.status(500).json({ message: 'Internal Server Error' });

}