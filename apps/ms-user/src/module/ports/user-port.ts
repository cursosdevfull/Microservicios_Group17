import { User } from "../application";

export interface UserPort {
    save(user: User): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByRefreshToken(refreshToken: string): Promise<User | null>;
    login(email: string, password: string): Promise<User | null>;
}