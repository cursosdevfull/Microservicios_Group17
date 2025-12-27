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
        this.mountHealthChecks();
        this.mountRoutes();
    }

    private setupMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private mountRoutes(): void {
        this.app.get("/", (req, res) => {
            res.json({
                name: "Microservice Processor Service",
                version: "1.0.0",
                description: "Microservice Processor Service"
            })
        });
        this.app.use("/v1/appointment", Router)

        this.app.use((req, res) => {
            res.status(404).json({ message: "Endpoint not found" });
        });
    }

    private mountHealthChecks(): void {
        this.healthcheckService = new HealthcheckService(this.registry);

        const healthcheckMiddleware = async (req: Request, res: Response) => {
            res.json({ message: "Processor service is healthy" });
        }

        this.app.get("/healthcheck", healthcheckMiddleware);
        this.app.get("/health", healthcheckMiddleware);
    }
}

export default new App().app