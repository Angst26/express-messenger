import {prisma} from "../../prisma/prisma.js";
import * as bcrypt from 'bcrypt'
import {RegisterPayload} from "./types.js";


export class AuthService {

    async registerUser({ email, password, name }: RegisterPayload) {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (existingUser){
            throw new Error(`User already exists`)
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPass,
                name: name,
            },
            select: {
                email: true,
                name: true,
                id: true,
            }
        })

        return user;
    }
}

export const authService = new AuthService();