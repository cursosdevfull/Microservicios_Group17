import { Appointment, AppointmentData } from "..";

export class AppointmentDto {
    static fromDataToDomain(data: AppointmentData | AppointmentData[]): Appointment | Appointment[] {
        if (Array.isArray(data)) {
            return data.map(d => this.fromDataToDomain(d) as Appointment);
        }
        return new Appointment(data['id'], data['slotId'], data['patientId'], data['createdAt']);
    }

    static fromDomainToData(domain: Appointment | Appointment[]): AppointmentData | AppointmentData[] {
        if (Array.isArray(domain)) {
            return domain.map(d => this.fromDomainToData(d) as AppointmentData);
        }
        return new AppointmentData(domain['id'], domain['slotId'], domain['patientId'], domain['createdAt']);
    }
}