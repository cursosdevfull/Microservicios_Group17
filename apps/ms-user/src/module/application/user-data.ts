import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user" })
export class UserData {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "varchar", length: 100, unique: true })
    email!: string;

    @Column({ type: "varchar", length: 100 })
    password!: string;

    @Column({ type: "varchar", length: 100 })
    refreshToken!: string;

    @Column({ type: "timestamp" })
    createdAt!: Date;
}