import { AuthPort } from "../ports";
import { TokenService } from "../services/token";
import { User } from "../types";
import { Auth } from "./auth";

export class Application {
    constructor(private port: AuthPort) { }

    async login(email: string, password: string) {
        const auth = new Auth(email, password);
        const user = await this.port.login(auth);

        if (user) {
            return TokenService.generateTokens(user);
        }

        return null
    }

    validateAccessToken(token: string): User | null {
        return TokenService.verifyAccessToken(token);
    }
}