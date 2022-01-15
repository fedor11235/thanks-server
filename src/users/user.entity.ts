import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryColumn()
    uid: string;

    @Column({ type: "varchar", length: 16, nullable: true  })
    id: string;

    @Column({ type: "varchar", length: 16 })
    idRecipient: string;

    @Column()
    reason: string;

}