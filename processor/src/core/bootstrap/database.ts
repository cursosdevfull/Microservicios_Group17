import { AppointmentData } from "../../module/application/appointment-data";
import { DataSource, DataSourceOptions } from "typeorm";

export class DatabaseBootstrap {
    static dataSource: DataSource

    async initializate() {
        return new Promise(async (resolve, reject) => {
            const options: DataSourceOptions = {
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "appuser",
                password: "apppassword",
                database: "appointments_db",
                entities: [AppointmentData],
                synchronize: true,
                logging: true,
                poolSize: 10,
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