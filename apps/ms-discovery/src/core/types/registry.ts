export enum EnumServiceStatus {
    HEALTHY = "HEALTHY",
    UNHEALTHY = "UNHEALTHY",
    UNKNOWN = "UNKNOWN"
}

export type TServiceInstance = {
    id: string;
    name: string;
    host: string;
    port: number;
    healthCheckUrl: string;
    lastHeartbeat: Date;
    status: EnumServiceStatus;
    registeredAt: Date;
}

export type TServiceRegistry = Omit<TServiceInstance, "id" | "lastHeartbeat" | "registeredAt" | "status">;