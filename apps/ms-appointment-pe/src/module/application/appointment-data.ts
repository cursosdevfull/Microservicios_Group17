import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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
}