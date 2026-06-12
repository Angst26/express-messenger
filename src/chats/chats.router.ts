import { Router } from 'express'
import { chatsController } from "./chats.controller.js";
import {authMiddleware} from "../middlewares/auth/auth.middleware.js";
import {validate} from "../middlewares/validate/validate.js";
import {createChatRequestSchema, getMessagesSchema} from "./types.js";

const router: Router = Router()

router.use(authMiddleware);

router.get('/chats',  chatsController.getChats)
router.get('/messages', validate(getMessagesSchema), chatsController.getMessagesFromChat)
router.post('/chats', validate(createChatRequestSchema), chatsController.createChat)

export default router
