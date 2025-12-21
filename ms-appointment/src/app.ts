import express, { Application, Request, Response } from "express";
import { RegistryService } from "./core/services/registry";
import { HealthcheckService } from "./core/services/healthcheck";
import Router from "./module/presentation/appointment-routes";

class App {
    readonly app: Application;
    private readonly registry = new RegistryService();
    private healthcheckService!: HealthcheckService;

    constructor() {
        this.app = express()
        this.setupMiddlewares();
        this.mountRoutes();
        this.mountHealthChecks();
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
        this.app.use("/appointment", Router)
    }

    private mountHealthChecks(): void {
        this.healthcheckService = new HealthcheckService(this.registry);

        const healthcheckMiddleware = async (req: Request, res: Response) => {
            const results = await this.healthcheckService.checkAllServices();
            res.json(results);
        }

        this.app.get("/healthcheck", healthcheckMiddleware);
        this.app.get("/health", healthcheckMiddleware);
    }
}

export default new App().app