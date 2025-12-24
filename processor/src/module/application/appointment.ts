export enum Status {
    QUEUED = "queued",
    COMPLETED = "completed",
    CANCELED = "canceled"
}

export type AppointmentEssential = {
    slotId: number;
    patientId: number;
}

export type AppointmentOptionals = {
    id: number;
    createdAt: Date;
    status: Status;
}

export type AppointmentProps = AppointmentEssential & Partial<AppointmentOptionals>;

export class Appointment {
    private id?: number;
    private slotId: number;
    private patientId: number;
    private createdAt: Date;
    private status?: Status

    constructor(props: AppointmentProps) {
        if (props.id && props.id < 1) throw new Error("Invalid id");
        if (props.slotId && props.slotId < 1) throw new Error("Invalid slotId");
        if (props.patientId && props.patientId < 1) throw new Error("Invalid patientId");
        if (props.createdAt && !(props.createdAt instanceof Date)) throw new Error("Invalid createdAt");

        this.slotId = props.slotId;
        this.patientId = props.patientId;

        this.createdAt = props.createdAt ? props.createdAt : new Date();

        if (props.id) {
            this.id = props.id;
        }

        this.status = props.status ? props.status : Status.QUEUED;
    }

    properties() {
        return {
            id: this.id,
            slotId: this.slotId,
            patientId: this.patientId,
            createdAt: this.createdAt,
            status: this.status
        }
    }
}