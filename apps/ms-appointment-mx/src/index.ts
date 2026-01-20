import app from "./app";
import { DatabaseBootstrap, ServerBootstrap } from "./core/bootstrap";
import "reflect-metadata"
import "./env"
import { DiscoveryClient } from "./core/clients/discovery.client";
import { RabbitMQBootstrap } from "./core/bootstrap/rabbitmq";
import { AppointmentController } from "./module/presentation";
import { Application } from "./module/application";
import { AppointmentPort } from "./module/ports";
import { AppointmentAdapter } from "./module/adapters";
import { KafkaBootstrap } from "./core/bootstrap/kafka";

const port: AppointmentPort = new AppointmentAdapter();
const application = new Application(port);
const controller = new AppointmentController(application);

(async () => {
    try {
        const serverBootstrap = new ServerBootstrap(app);
        const databaseBootstrap = new DatabaseBootstrap();
        const kafkaBootstrap = new KafkaBootstrap();

        const listeningPromises = [
            serverBootstrap.initialize(),
            databaseBootstrap.initializate(),
            kafkaBootstrap.initialize()
        ];

        const results = await Promise.all(listeningPromises);

        results.forEach(result => console.log(result));

        const discoveryClient = new DiscoveryClient();
        await discoveryClient.register();

        controller.receive();

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