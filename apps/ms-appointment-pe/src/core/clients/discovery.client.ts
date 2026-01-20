import { env } from "../../env"

export class DiscoveryClient {
    private readonly discoveryUrl: string = env.DISCOVERY_URL
    private readonly discoveryPort = env.DISCOVERY_PORT
    private readonly host = env.HOST
    private readonly name = env.NAME
    private readonly portService = env.PORT

    async register() {
        const serviceInfo = {
            name: this.name,
            host: this.host,
            port: this.portService,
            healthCheckUrl: `http://${this.host}:${this.portService}/health`
        }

        try {
            const response = await fetch(`${this.discoveryUrl}:${this.discoveryPort}/api/services`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(serviceInfo)
            })

            if (!response.ok) {
                throw new Error(`Failed to register service: ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Service registered successfully:", data);

        } catch (error) {
            console.error("Error registering service:", error);
        }
    }
}