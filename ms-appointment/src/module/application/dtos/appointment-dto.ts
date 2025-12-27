import { Appointment, AppointmentData, Status } from "..";

export class AppointmentDto {
    static fromDataToDomain(data: AppointmentData | AppointmentData[]): Appointment | Appointment[] {
        if (Array.isArray(data)) {
            return data.map(d => this.fromDataToDomain(d) as Appointment);
        }
        return new Appointment({
            id: data.id,
            slotId: data.slotId,
            patientId: data.patientId,
            createdAt: data.createdAt,
            events: data.events
        });
    }

    static fromDomainToData(domain: Appointment | Appointment[]): AppointmentData | AppointmentData[] {
        if (Array.isArray(domain)) {
            return domain.map(d => this.fromDomainToData(d) as AppointmentData);
        }

        const appointmentData = new AppointmentData();
        appointmentData.id = domain.properties().id as number;
        appointmentData.slotId = domain.properties().slotId;
        appointmentData.patientId = domain.properties().patientId;
        appointmentData.createdAt = domain.properties().createdAt;
        appointmentData.events = domain.properties().events as Array<{ status: Status; timestamp: Date }>;
        return appointmentData;
    }
}