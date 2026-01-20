import { Column, Entity, PrimaryColumn } from "typeorm";
import { Status } from "./appointment";

@Entity({ name: "appointment-mx" })
export class AppointmentData {
    @PrimaryColumn()
    id!: number;

    @Column()
    slotId!: number;

    @Column()
    patientId!: number;

    @Column()
    country!: number;

    @Column()
    createdAt!: Date;

    @Column({ type: "json" })
    events!: Array<{ status: Status; timestamp: Date }>;
}