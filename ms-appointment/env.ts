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
});

type Env = z.infer<typeof schema>;

export const env: Env = schema.parse(process.env);