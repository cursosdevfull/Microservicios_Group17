import { env } from "../../../env";
import { Auth } from "../application";
import { AuthPort } from "../ports";
import { User } from "../types";

export class AuthAdapter implements AuthPort {
    async login(auth: Auth): Promise<User | null> {
        const discoveryUrl = env.DISCOVERY_URL
        const discoveryPort = env.DISCOVERY_PORT
        const serviceName = "user"

        const result = await fetch(`${discoveryUrl}:${discoveryPort}/api/services/name/${serviceName}?healthy=false`).then(res => res.json())
        const host = result[0].host
        const port = result[0].port

        return fetch(`${host}:${port}/v1/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(auth.properties())
        }).then(res => res.json())
    }


}