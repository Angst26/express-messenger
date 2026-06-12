import z from 'zod'
import {ProtectedRequest} from "../middlewares/auth/types.js";
export const getMessagesSchema = z.object({
    chatId: z.int()
})

export type GetMessagesBody = z.infer<typeof getMessagesSchema>
export interface GetMessagesRequest extends ProtectedRequest {
    body: GetMessagesBody
}

export const chatDataSchema = z.object({
    guestId: z.int(),
    currentUserId: z.int(),
    title: z.string().optional(),
})

export const createChatRequestSchema = z.object({
    body: chatDataSchema.omit({ currentUserId: true }),
})


export type CreateChatBody = z.infer<typeof chatDataSchema>
export type CreateChatRequest = z.infer<typeof createChatRequestSchema> & ProtectedRequest