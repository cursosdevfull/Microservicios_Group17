import { Column, Entity, PrimaryColumn } from "typeorm";

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
}