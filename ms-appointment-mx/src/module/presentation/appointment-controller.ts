import { Application } from "../application";

export class AppointmentController {
    constructor(private application: Application) { }

    async receive() {
        await this.application.receiveMessage()
    }
}