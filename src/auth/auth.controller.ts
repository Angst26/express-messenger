import {NextFunction, Request, Response } from "express";
import { authService } from "./auth.service.js";
import {RegisterPayload} from "./types.js";

class AuthController {
    registerUser = async (req: Request<any, any, RegisterPayload>, res: Response, next: NextFunction) => {
        const response = await authService.registerUser(req.body)
        res.status(201).json(response)
    }
}

export const authController = new AuthController();