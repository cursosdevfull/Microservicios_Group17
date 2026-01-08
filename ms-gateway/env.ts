import "dotenv/config";
import { z } from "zod";

const schema = z.object({
    NAME: z.string().default("appointment"),
    PORT: z.coerce.number().default(4000),
    HOST: z.string().default("http_//localhost"),
    DISCOVERY_URL: z.string().default("http://localhost"),
    DISCOVERY_PORT: z.coerce.number().default(4000),
});

type Env = z.infer<typeof schema>;

export const env: Env = schema.parse(process.env);