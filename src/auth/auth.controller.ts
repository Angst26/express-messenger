import {NextFunction, Request, Response} from "express";
import { authService } from "./auth.service.js";
import {LoginPayload, RegisterPayload} from "./types.js";

class AuthController {
    registerUser = async (req: Request<any, any, RegisterPayload>, res: Response, next: NextFunction) => {
        const response = await authService.registerUser(req.body)
        res.status(201).json(response)
    }

    loginUser = async (req: Request<any, any, LoginPayload>, res: Response, next: NextFunction) => {
        const payload =  await authService.login(req.body);
        res.status(200).json(payload);
    }
}

export const authController = new AuthController();