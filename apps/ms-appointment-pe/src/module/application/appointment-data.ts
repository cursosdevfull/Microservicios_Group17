import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./appointment";

@Entity({ name: "appointment-pe" })
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