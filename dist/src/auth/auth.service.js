import { prisma } from "../../prisma/prisma.ts";
export class AuthService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
}
export const authService = new AuthService(prisma);
//# sourceMappingURL=auth.service.js.map