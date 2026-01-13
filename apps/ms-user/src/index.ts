import app from "./app";
import { DatabaseBootstrap, ServerBootstrap } from "./core/bootstrap";
import "reflect-metadata"
import "../env"
import { DiscoveryClient } from "./core/clients/discovery.client";

(async () => {
    try {
        const serverBootstrap = new ServerBootstrap(app);
        const databaseBootstrap = new DatabaseBootstrap();

        const listeningPromises = [
            serverBootstrap.initialize(),
            databaseBootstrap.initializate(),
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