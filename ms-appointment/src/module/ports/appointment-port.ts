import { AppointmentData } from "../application";


export interface AppointmentPort {
    save(data: AppointmentData): void;
    retrieve(id: number): Promise<AppointmentData | null>
    update(data: AppointmentData): void;
}