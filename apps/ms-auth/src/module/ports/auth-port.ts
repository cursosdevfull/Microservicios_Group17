import { Auth } from "../application";
import { User } from "../types";

export interface AuthPort {
    login(auth: Auth): Promise<User | null>;
}