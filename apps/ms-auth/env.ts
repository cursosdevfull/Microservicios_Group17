import "dotenv/config";
import { z } from "zod";

const schema = z.object({
    NAME: z.string().default("appointment"),
    PORT: z.coerce.number().default(4000),
    HOST: z.string().default("http_//localhost"),
    JWT_ACCESS_SECRET: z.string().default("defaultaccesssecret"),
    JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
    DISCOVERY_URL: z.string().default("http://localhost"),
    DISCOVERY_PORT: z.coerce.number().default(4000),

});

type Env = z.infer<typeof schema>;

export const env: Env = schema.parse(process.env);