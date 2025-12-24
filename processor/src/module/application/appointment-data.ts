import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./appointment";

@Entity({ name: "appointment-processor" })
export class AppointmentData {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    slotId!: number;

    @Column()
    patientId!: number;

    @Column()
    createdAt!: Date;

    @Column({ type: "varchar" })
    status!: Status
}