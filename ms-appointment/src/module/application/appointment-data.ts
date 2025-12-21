export class AppointmentData {
    private id: number;
    private slotId: number;
    private patientId: number;
    private createdAt: Date;

    constructor(id: number, slotId: number, patientId: number, createdAt: Date) {
        this.id = id;
        this.slotId = slotId;
        this.patientId = patientId;
        this.createdAt = createdAt;
    }

    properties() {
        return {
            id: this.id,
            slotId: this.slotId,
            patientId: this.patientId,
            createdAt: this.createdAt
        };
    }
}