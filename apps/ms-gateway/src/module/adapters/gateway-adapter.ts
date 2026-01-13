import { env } from "../../../env";
import { GatewayPort } from "../ports";

export class GatewayAdapter implements GatewayPort {
    async bookAppointment(slotId: number, patientId: number, country: string): Promise<any> {
        const discoveryUrl = env.DISCOVERY_URL
        const discoveryPort = env.DISCOVERY_PORT
        const serviceName = "appointment"

        const result = await fetch(`${discoveryUrl}:${discoveryPort}/api/services/name/${serviceName}?healthy=false`).then(res => res.json())
        const host = result[0].host
        const port = result[0].port

        return fetch(`${host}:${port}/v1/appointment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ slotId, patientId, country: +country })
        }).then(res => res.json())
    }

    async createUser(name: string, email: string, password: string): Promise<any> {
        const discoveryUrl = env.DISCOVERY_URL
        const discoveryPort = env.DISCOVERY_PORT
        const serviceName = "user"

        const result = await fetch(`${discoveryUrl}:${discoveryPort}/api/services/name/${serviceName}?healthy=false`).then(res => res.json())
        const host = result[0].host
        const port = result[0].port

        return fetch(`${host}:${port}/v1/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        }).then(res => res.json())
    }
}