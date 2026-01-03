import { DatabaseBootstrap } from "src/core/bootstrap";
import { AppointmentData } from "../application";
import { AppointmentPort } from "../ports";
import { env } from "../../../env";
import { RabbitMQProducer } from "src/core/services/rabbitmq-producer";
import { RabbitMQConsumer } from "src/core/services/rabbitmq-consumer";

export class AppointmentAdapter implements AppointmentPort {
    async save(data: AppointmentData) {
        await this.saveToDatabase(data);
        //this.sendAppointmentToProcessor(data);
        this.sendRabbitMQ(data);
        console.log("Appointment saved", data);
    }

    async update(data: AppointmentData) {
        await this.saveToDatabase(data);
        console.log("Appointment updated", data);
    }

    async retrieve(id: number): Promise<AppointmentData | null> {
        const repository = DatabaseBootstrap.dataSource.getRepository(AppointmentData)
        const appointment = await repository.findOne({ where: { id } });
        return appointment;
    }

    async receiveMessage(consumer: (msg: any) => void) {
        await RabbitMQConsumer.consumeMessage(consumer);
    }

    private async saveToDatabase(data: AppointmentData) {
        const repository = DatabaseBootstrap.dataSource.getRepository(AppointmentData)
        await repository.save(data);
    }

    private async sendRabbitMQ(data: AppointmentData) {
        await RabbitMQProducer.publishAppointmentCreated(data);
    }

    private async sendAppointmentToProcessor(data: AppointmentData) {
        const discoveryUrl = env.DISCOVERY_URL
        const discoveryPort = env.DISCOVERY_PORT
        const serviceName = "processor"

        const result = await fetch(`${discoveryUrl}:${discoveryPort}/api/services/name/${serviceName}?healthy=false`).then(res => res.json())
        const host = result[0].host
        const port = result[0].port

        console.log("Call processor", `${host}:${port}/v1/appointment`)
        console.log("Data", data)

        await fetch(`${host}:${port}/v1/appointment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())

    }
}