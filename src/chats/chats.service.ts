import {prisma} from "../../prisma/prisma.js";
import {NotFoundException} from "../exceptions/NotFoundException.js";
import {CreateChatBody} from "./types.js";

export class ChatsService {
    async getMessages(chatId: number) {
        const chat = await prisma.chat.findUnique({
            where: {id: chatId},
            include: {
                messages: {
                    include: {
                        author: {
                            select: {
                                name: true,
                                id: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
        if (!chat) {
            throw new NotFoundException('No chats found');
        }

        return chat.messages;
    }

    async getChats(userId: number) {
        if(!userId) throw new NotFoundException('User not found');

        const chats = await prisma.chat.findMany({
            where: {
                participants: {
                    some: {
                        id: userId,
                    },
                },
            },
            include: {
                participants: {
                    where: {
                        id: {not: userId},
                    },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    }
                },
                messages: {
                    orderBy: {
                        date: 'desc',
                    },
                    take: 1,
                }
            }
        });
        return chats;
    }

    async createChat({
                         guestId,
                         currentUserId,
                         title,
                     }: CreateChatBody) {
        // проверяем что чата между пользователем и гостем еще нет
        const chatAlreadyExists = await prisma.chat.findFirst({
            where: {
                AND: [
                    {
                        participants: {
                            some: {id: currentUserId},
                        },
                    },
                    {
                        participants: {
                            some: {id: guestId},
                        },
                    },
                ],
            },
        });
        if (chatAlreadyExists) return chatAlreadyExists;
        const newChat = await prisma.chat.create({
            data: {
                creatorId: currentUserId,
                title: title ?? `Новый  чат`,
                participants: {
                    connect: [
                        {
                            id: currentUserId,
                        },
                        {
                            id: guestId,
                        },
                    ],
                },
            },
        });

        return newChat;
    }
}

export const chatsService = new ChatsService();