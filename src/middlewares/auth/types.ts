import { Request } from "express";

export type UserPayload = { id: number; email: string };

export interface ProtectedRequest extends Request {
    user?: {
        id: number;
        email: string;
    }
}