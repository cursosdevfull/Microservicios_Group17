import { Appointment, AppointmentData } from ".";
import { AppointmentPort } from "../ports/appointment-port";
import { AppointmentDto } from "./dtos";

export class Application {
    constructor(private port: AppointmentPort) { }

    processAppointment(appointment: Appointment) {
        const appointmentData = AppointmentDto.fromDomainToData(appointment) as AppointmentData;
        this.port.save(appointmentData);
    }

    retrieve(id: number) {
        return this.port.retrieve(id);
    }

    update(appointment: Appointment) {
        const appointmentData = AppointmentDto.fromDomainToData(appointment) as AppointmentData;
        return this.port.update(appointmentData);
    }
}