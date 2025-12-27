import { Appointment, AppointmentData, Status } from ".";
import { AppointmentPort } from "../ports/appointment-port";
import { AppointmentDto } from "./dtos";

export class Application {
    constructor(private port: AppointmentPort) { }

    processAppointment(appointment: Appointment) {
        const status: Status = Status.COMPLETED

        appointment.update({ status });

        const appointmentData = AppointmentDto.fromDomainToData(appointment) as AppointmentData;
        this.port.save(appointmentData);
    }
}