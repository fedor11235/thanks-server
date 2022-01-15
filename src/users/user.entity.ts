import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class UserEntity {

    @PrimaryColumn()
    uid: string;

    @Column({ type: "varchar", length: 16 })
    id: string;

    @Column({ type: "varchar", length: 16, nullable: true })
    recipient: string;

    @Column()
    reason: string;
}