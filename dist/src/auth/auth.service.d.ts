import { PrismaClient } from "@prisma/client";
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaClient);
}
export declare const authService: AuthService;
