import express, { Application } from "express";
import { createRoutes } from "./routes";
import { RegistryService } from "./core/services/registry";

class App {
    readonly app: Application;
    private readonly registry = new RegistryService();

    constructor() {
        this.app = express()
        this.setupMiddlewares();
        this.mountRoutes();
    }

    private setupMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private mountRoutes(): void {
        this.app.get("/", (req, res) => {
            res.json({
                name: "Microservice Discovery",
                version: "1.0.0",
                description: "Microservice Discovery Service",
                endpoints: {
                    health: "/health",
                    healthcheck: "/healthcheck",
                    register: "/api/services",
                    heartbeat: "/api/services/:id/heartbeat",
                    unregister: "/api/services/:id",
                    services: "/api/services",
                    serviceByName: "/api/services/name/:name",
                    serviceById: "/api/services/id/:id",
                    stats: "/api/stats"
                }
            })
        });

        this.app.use("/api", createRoutes(this.registry));
    }
}

export default new App().app