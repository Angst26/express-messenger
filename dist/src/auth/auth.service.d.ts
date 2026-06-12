import 'dotenv/config';
import { RegisterPayload } from "./types.js";
export declare class AuthService {
    registerUser({ email, password, name }: RegisterPayload): Promise<{
        id: number;
        email: string;
        name: string;
    }>;
    login({ email, password }: Pick<RegisterPayload, 'password' | 'email'>): Promise<{
        access_token: string;
    }>;
}
export declare const authService: AuthService;
