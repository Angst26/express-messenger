import {ProtectedRequest} from "../middlewares/auth/types.js";
import { Response } from "express";
import {chatsService} from "./chats.service.js";
import {CreateChatRequest, GetMessagesRequest} from "./types.js";

export class ChatsController {
    getChats = async (req: ProtectedRequest, res: Response) => {
        const userId = req.user!.id;
        const payload = await chatsService.getChats(userId)
        res.status(200).json(payload);
    }
    getMessagesFromChat = async (req: GetMessagesRequest, res: Response) => {
        const chatId = req.body.chatId;
        const payload = await chatsService.getMessages(chatId);
        res.status(200).json(payload);
    }
    createChat = async (req: CreateChatRequest, res: Response) => {
        const currentUserId = req.user!.id;
        const payload = await chatsService.createChat({
            currentUserId,
            ...req.body,
        })
        res.status(201).json(payload);
    }
}

export const chatsController = new ChatsController();