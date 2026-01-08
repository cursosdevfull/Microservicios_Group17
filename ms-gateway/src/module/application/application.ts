import { Appointment, AppointmentData } from ".";
import { AppointmentPort } from "../ports/appointment-port";
import { AppointmentDto } from "./dtos";

export class Application {
    constructor(private port: AppointmentPort) { }

    processAppointment(appointment: Appointment) {
        const appointmentData = AppointmentDto.fromDomainToData(appointment) as AppointmentData;
        this.port.sendAppointment(appointmentData);
    }
}