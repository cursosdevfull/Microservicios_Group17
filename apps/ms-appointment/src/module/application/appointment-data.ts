import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./appointment";

@Entity({ name: "appointment" })
export class AppointmentData {
    @PrimaryGeneratedColumn()
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