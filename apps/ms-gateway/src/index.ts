import app from "./app";
import { ServerBootstrap } from "./core/bootstrap";
import "../env"
import { DiscoveryClient } from "./core/clients/discovery.client";

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