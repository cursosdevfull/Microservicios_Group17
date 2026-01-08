import app from "./app";
import { ServerBootstrap } from "./core/bootstrap";
import "reflect-metadata"
import "../env"
import { DiscoveryClient } from "./core/clients/discovery.client";
import { AppointmentController } from "./module/presentation";
import { Application } from "./module/application";
import { AppointmentPort } from "./module/ports";
import { AppointmentAdapter } from "./module/adapters";

const port: AppointmentPort = new AppointmentAdapter();
const application = new Application(port);
const controller = new AppointmentController(application);

(async () => {
    try {
        const serverBootstrap = new ServerBootstrap(app);

        const listeningPromises = [
            serverBootstrap.initialize(),
        ];

        const results = await Promise.all(listeningPromises);

        results.forEach(result => console.log(result));

        const discoveryClient = new DiscoveryClient();
        await discoveryClient.register();

    } catch (error) {
        console.error("Error during server bootstrap:", error);
    }
})()

process.on("unhandledRejection", (reason, promise) => {
    process.exit(1);
})

process.on("uncaughtException", (error) => {
    process.exit(1);
})

process.on("SIGNIT", () => {
    process.exit(0);
})

process.on("SIGTERM", () => {
    process.exit(0);
})

process.on("exit", code => console.log(`Process exited with code: ${code}`));