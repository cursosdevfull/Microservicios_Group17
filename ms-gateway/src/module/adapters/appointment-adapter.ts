import { AppointmentData } from "../application";
import { AppointmentPort } from "../ports";
import { env } from "../../../env";

export class AppointmentAdapter implements AppointmentPort {

    async sendAppointment(data: AppointmentData) {
        const discoveryUrl = env.DISCOVERY_URL
        const discoveryPort = env.DISCOVERY_PORT
        const serviceName = "appointment"

        const result = await fetch(`${discoveryUrl}:${discoveryPort}/api/services/name/${serviceName}?healthy=false`).then(res => res.json())
        const host = result[0].host
        const port = result[0].port

        console.log("Call processor", `${host}:${port}/v1/appointment`)
        console.log("Data", data)

        await fetch(`${host}:${port}/v1/appointment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())

    }
}