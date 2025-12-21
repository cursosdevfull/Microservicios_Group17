import { AppointmentData } from "../application";


export interface AppointmentPort {
    save(data: AppointmentData): any
}