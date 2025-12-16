import { EnumServiceStatus, TServiceInstance, TServiceRegistry } from "../types";
import { v4 as uuidv4 } from "uuid";

export class RegistryService {
    private services: Map<string, TServiceInstance> = new Map()

    constructor() { }

    register(registry: TServiceRegistry): TServiceInstance {
        const serviceId = uuidv4();
        const now = new Date();

        const service: TServiceInstance = {
            id: serviceId,
            name: registry.name,
            host: registry.host,
            port: registry.port,
            healthCheckUrl: registry.healthCheckUrl,
            lastHeartbeat: now,
            status: EnumServiceStatus.HEALTHY,
            registeredAt: now
        }

        this.services.set(serviceId, service);
        console.log(`Service ${service.name} registered with ID ${service.id}`);

        return service
    }

    heartbeat(serviceId: string): boolean {
        const service = this.services.get(serviceId);

        if (service) {
            service.lastHeartbeat = new Date();
            service.status = EnumServiceStatus.HEALTHY;
            service.lastHeartbeat = new Date();
            console.log(`Received heartbeat from service ID ${serviceId}`);
            return true;
        }

        return false
    }

    unregister(serviceId: string): boolean {
        const deleted = this.services.delete(serviceId);

        if (deleted) {
            console.log(`Service ID ${serviceId} unregistered`);
        }
        return deleted;
    }

    getServicesByName(name: string): TServiceInstance[] {
        return Array.from(this.services.values())
    }

}