import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/user.entity";
import { Section } from "src/sections/entities/section.entity";
import { OutgoRecord } from "./outgo-record.entry";

@Entity()
export class Outgo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime' })
    @Index()
    date: string;

    @Column()
    receptNo: string;

    @ManyToOne(type => User, (user) => user)
    user: User

    @ManyToOne(type => Section, (section) => section)
    section: Section

    @OneToMany(type => OutgoRecord, (record) => record.outgo, {cascade: true})
    records: OutgoRecord[]

}
