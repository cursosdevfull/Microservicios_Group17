import "dotenv/config";
import { z } from "zod";

const schema = z.object({
    NAME: z.string().default("appointment"),
    PORT: z.coerce.number().default(4000),
    HOST: z.string().default("http_//localhost"),
    DB_HOST: z.string().default("localhost"),
    DB_PORT: z.coerce.number().default(3306),
    DB_USERNAME: z.string().default("appuser"),
    DB_PASSWORD: z.string().default("apppassword"),
    DB_NAME: z.string().default("appointments_db"),
    DB_SYNCHRONIZE: z.string().transform(val => val === "true" ? true : false).default(true),
    DB_LOGGING: z.string().transform(val => val === "true" ? true : false).default(false),
    DB_POOL_SIZE: z.coerce.number().default(10),
    DISCOVERY_URL: z.string().default("http://localhost"),
    DISCOVERY_PORT: z.coerce.number().default(4000),
    RABBITMQ_URL: z.string().default("amqp://localhost"),
    RABBITMQ_PORT: z.coerce.number().default(5672),
    RABBITMQ_PREFETCH: z.coerce.number().default(10),
    RABBITMQ_EXCHANGE_NAME: z.string().default("appointments_exchange"),
    RABBITMQ_EXCHANGE_TYPE: z.string().default("direct"),
    RABBITMQ_QUEUE_APPOINTMENTS: z.string().default("appointments_queue"),
    RABBITMQ_ROUTING_KEY_APPOINTMENT: z.string().default("appointment_routing_key"),
    KAFKA_BROKER: z.string().default("localhost:9092"),
    KAFKA_GROUP_ID: z.string().default("1000"),
    KAFKA_TOPIC: z.string().default("appointments_topic"),
    KAFKA_CLIENT_ID: z.string().default("appointment_service"),
    KAFKA_TOPIC_UPDATE: z.string().default("appointment_updates_topic"),
});

type Env = z.infer<typeof schema>;

export const env: Env = schema.parse(process.env);