import { GatewayPort } from "../ports";

export class Application {
    constructor(private port: GatewayPort) { }

    bookAppointment(slotId: number, patientId: number, country: string) {
        this.port.bookAppointment(slotId, patientId, country);
    }

    createUser(name: string, email: string, password: string) {
        this.port.createUser(name, email, password);
    }
}