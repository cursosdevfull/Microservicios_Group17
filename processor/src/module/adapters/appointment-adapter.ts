import { DatabaseBootstrap } from "src/core/bootstrap";
import { AppointmentData } from "../application";
import { AppointmentPort } from "../ports";
import { Repository } from "typeorm";

export class AppointmentAdapter implements AppointmentPort {

    async save(data: AppointmentData) {
        const repository = DatabaseBootstrap.dataSource.getRepository(AppointmentData)
        await repository.save(data);

        console.log("Appointment saved", data);
    }
}