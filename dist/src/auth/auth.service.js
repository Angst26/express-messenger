import 'dotenv/config';
import { prisma } from "../../prisma/prisma.js";
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
export class AuthService {
    async registerUser({ email, password, name }) {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if (existingUser) {
            throw new Error(`User already exists`);
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
        });
        return user;
    }
    async login({ email, password }) {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if (!existingUser) {
            throw new Error(`User doest not exist!`);
        }
        const validPass = await bcrypt.compare(password, existingUser.password);
        if (!validPass) {
            throw new Error(`Incorrect password!`);
        }
        const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return {
            access_token: token,
        };
    }
}
export const authService = new AuthService();
//# sourceMappingURL=auth.service.js.map