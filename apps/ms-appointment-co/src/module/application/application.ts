import { AppointmentPort } from "../ports/appointment-port";

export class Application {
    constructor(private port: AppointmentPort) { }

    async receiveMessage() {
        await this.port.receiveMessage(this.consumerMessage.bind(this));
    }

    async consumerMessage(msg: string) {
        if (msg) {
            const { id, slotId, patientId } = JSON.parse(msg);
            const createdAt = new Date();
            await this.port.save({ id, slotId, patientId, country: 1, createdAt, events: [] });
            console.log("Received message:", { id, slotId, patientId });
            await this.port.sendKafka(id);
        }
    }
}