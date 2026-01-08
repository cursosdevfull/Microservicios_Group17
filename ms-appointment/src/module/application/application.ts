import { RabbitMQBootstrap } from "src/core/bootstrap/rabbitmq";
import { Appointment, AppointmentData, Status } from ".";
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

    async receiveMessage() {
        await this.port.receiveMessage(this.consumerMessage.bind(this));
    }

    async consumerMessage(msg: string) {
        console.log("Consuming message:", msg);
        if (msg) {
            const id = msg;
            const createdAt = new Date();
            const appointmentData = await this.port.retrieve(Number(id));

            if (!appointmentData) {
                console.log("Appointment not found", id);
                return;
            }
            await this.port.update({ id: appointmentData.id, slotId: appointmentData.slotId, patientId: appointmentData.patientId, country: 1, createdAt, events: [...appointmentData.events, { status: Status.COMPLETED, timestamp: createdAt }] });
        }
    }
}