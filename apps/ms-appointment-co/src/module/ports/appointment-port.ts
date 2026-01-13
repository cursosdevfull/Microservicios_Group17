import { AppointmentData } from "../application";


export interface AppointmentPort {
    save(data: AppointmentData): Promise<void>;
    receiveMessage(consumer: (msg: any) => void): void;
    sendKafka(id: number): Promise<void>;
}