export class Appointment {
    private id: number;
    private slotId: number;
    private patientId: number;
    private createdAt: Date;

    constructor(id: number, slotId: number, patientId: number, createdAt: Date) {
        if (id < 1) throw new Error("Invalid id");
        if (slotId < 1) throw new Error("Invalid slotId");
        if (patientId < 1) throw new Error("Invalid patientId");
        if (!(createdAt instanceof Date)) throw new Error("Invalid createdAt");

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
        }
    }
}