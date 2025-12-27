export enum Status {
    CANCELED = "canceled",
    COMPLETED = "completed",
    ERROR = "error",
    QUEUED = "queued",
    RECEIVED = "received"
}

export type AppointmentEssential = {
    slotId: number;
    patientId: number;
}

export type AppointmentOptionals = {
    id: number;
    createdAt: Date;
    events: Array<{ status: Status; timestamp: Date }>
}

export type AppointmentProps = AppointmentEssential & Partial<AppointmentOptionals>;

export class Appointment {
    private id?: number;
    private slotId: number;
    private patientId: number;
    private createdAt: Date;
    private events?: Array<{ status: Status; timestamp: Date }>;

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

        this.events = props.events ? props.events : [{ status: Status.QUEUED, timestamp: new Date() }];
    }

    properties() {
        return {
            id: this.id,
            slotId: this.slotId,
            patientId: this.patientId,
            createdAt: this.createdAt,
            events: this.events
        }
    }
}