
import { env } from "../../../env";
import { Appointment, AppointmentData, AppointmentProps } from "../../module/application";
import { RabbitMQBootstrap } from "../bootstrap/rabbitmq";

export type MessageOptions = {
    exchange?: string;
    routingKey?: string;
    persistent?: boolean;
    headers?: Record<string, any>;
    correlationId?: string;
}

export class RabbitMQProducer {
    static async publishAppointmentCreated(appointment: AppointmentData) {
        console.log("Publishing appointment created event to RabbitMQ:", appointment);

        const message = {
            event: "appointment.created",
            data: appointment,
            timestamp: new Date().toISOString()
        }

        this.publishMessage(message, {
            exchange: env.RABBITMQ_EXCHANGE_NAME,
            routingKey: env.RABBITMQ_ROUTING_KEY_APPOINTMENT,
            persistent: true
        });
    }

    private static publishMessage(message: { event: string, data: AppointmentProps, timestamp: string }, options: MessageOptions) {
        const {
            exchange = env.RABBITMQ_EXCHANGE_NAME,
            routingKey = "",
            persistent = true,
            headers = {},
            correlationId
        } = options;

        const msgBuffer = Buffer.from(JSON.stringify(message));
        const publishOptions = {
            persistent,
            timestamp: Date.now(),
            headers,
            correlationId: correlationId || this.generateMessageId(),
            messageId: this.generateMessageId()
        }

        const channel = RabbitMQBootstrap.getProducerChannel();

        channel.publish(exchange, routingKey, msgBuffer, publishOptions)

    }

    private static generateMessageId(): string {
        return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }
}