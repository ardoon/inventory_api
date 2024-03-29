import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    role: string;

    @Column({
        nullable: true
    })
    mobile: string;

    @Column({
        nullable: true
    })
    password: string;

}