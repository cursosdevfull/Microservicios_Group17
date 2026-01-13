import { RegistryService } from "./registry";

interface HealthcheckResult {
    overall: "healthy" | "unhealthy",
    timestamp: Date,
}


export class HealthcheckService {
    constructor(private registry: RegistryService) { }

    async checkAllServices() {
        const services = this.registry.getAllServices();

        const statusHealthchecks = []

        for (const service of services) {
            try {
                const response = await fetch(service.healthCheckUrl);
                if (response.ok) {
                    statusHealthchecks.push({ serviceId: service.id, serviceName: service.name, status: "healthy", timestamp: new Date() });
                } else {
                    statusHealthchecks.push({ serviceId: service.id, serviceName: service.name, status: "unhealthy", timestamp: new Date() });
                }
            } catch (error) {
                statusHealthchecks.push({ serviceId: service.id, serviceName: service.name, status: "unhealthy", timestamp: new Date() });
            }
        }

        return statusHealthchecks;
    }
}