import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Status } from "./appointment";

@Entity({ name: "appointment-processor" })
export class AppointmentData {
    @PrimaryColumn()
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