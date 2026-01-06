import { RabbitMQBootstrap } from "src/core/bootstrap/rabbitmq";
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

    async receiveMessage() {
        await this.port.receiveMessage(this.consumerMessage.bind(this));
    }

    /*async consumerMessage(msg: any) {
        if (msg) {
            const content = JSON.parse(msg.content.toString());
            console.log("Received message:", content);
            RabbitMQBootstrap.getConsumerChannel().ack(msg);
        }
    }*/
    async consumerMessage(msg: string) {
        if (msg) {
            const content = JSON.parse(msg);
            console.log("Received message:", content);
        }
    }
}