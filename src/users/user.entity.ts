import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryColumn()
    uid: string;

    @Column({ type: "varchar", length: 16 })
    id: number;

    @Column({ type: "varchar", length: 16, nullable: true })
    recipient: string;

    @Column()
    reason: string;
}