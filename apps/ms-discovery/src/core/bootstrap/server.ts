import { Application } from "express";
import http from "http";
import { env } from "../../env";

export class ServerBootstrap {
    constructor(private readonly app: Application) { }

    async initialize(): Promise<any> {
        const server = http.createServer(this.app);
        const port = env.PORT;

        return new Promise((resolve, reject) => {
            server
                .listen(port)
                .on("listening", () => resolve(`Server is listening on port ${port}`))
                .on("error", (err) => reject(err));
        })
    }
}