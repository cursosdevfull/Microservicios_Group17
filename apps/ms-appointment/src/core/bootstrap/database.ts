import { env } from "../../env";
import { AppointmentData } from "../../module/application/appointment-data";
import { DataSource, DataSourceOptions } from "typeorm";

export class DatabaseBootstrap {
    static dataSource: DataSource

    async initializate() {
        return new Promise(async (resolve, reject) => {
            const options: DataSourceOptions = {
                type: "mysql",
                host: env.DB_HOST,
                port: env.DB_PORT,
                username: env.DB_USERNAME,
                password: env.DB_PASSWORD,
                database: env.DB_NAME,
                entities: [AppointmentData],
                synchronize: env.DB_SYNCHRONIZE,
                logging: env.DB_LOGGING,
                poolSize: env.DB_POOL_SIZE,
            }

            try {
                const app = new DataSource(options)
                await app.initialize()
                DatabaseBootstrap.dataSource = app
                resolve("Database connected successfully")
            } catch (error) {
                console.log("Database connection error:", error)
                reject(error)
            }
        })
    }
}