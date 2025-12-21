import { AppointmentData } from "../application";
import { AppointmentPort } from "../ports";

export class AppointmentAdapter implements AppointmentPort {
    save(data: AppointmentData) {
        console.log("Appointment saved", data);
    }
}