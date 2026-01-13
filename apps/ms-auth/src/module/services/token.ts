import { Tokens, User } from "../types";
import * as jwt from "jsonwebtoken";
import { env } from "../../../env";

export class TokenService {
    static generateTokens(user: User): Tokens {
        const payload = { email: user.email, name: user.name };

        const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
            expiresIn: env.JWT_ACCESS_EXPIRES_IN as any,
        });

        return { accessToken, refreshToken: user.refreshToken };
    }

    static verifyAccessToken(token: string): User | null {
        try {
            const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
            return payload as User;
        } catch (error) {
            return null;
        }
    }
}