import { AppointmentData } from "../application";


export interface AppointmentPort {
    sendAppointment(data: AppointmentData): Promise<void>;
}