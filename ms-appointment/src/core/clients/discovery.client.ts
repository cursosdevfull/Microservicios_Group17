export class DiscoveryClient {
    private readonly discoveryUrl: string = "http://localhost"
    private readonly portDiscovery = 4000
    private readonly host = "localhost"
    private readonly name = "appointment"
    private readonly portService = 4010

    async register() {
        const serviceInfo = {
            name: this.name,
            host: this.host,
            port: this.portService,
            healthCheckUrl: `http://${this.host}:${this.portService}/health`
        }

        try {
            const response = await fetch(`${this.discoveryUrl}:${this.portDiscovery}/api/services`, {
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