import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntryRecord } from "./entry-record.entry";
import { User } from "src/users/user.entity";
import { Warehouse } from "src/warehouses/entities/warehouse.entity";

@Entity()
export class Entry {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime' })
    @Index()
    date: string;

    @Column()
    receptNo: string;

    @ManyToOne(type => User, (user) => user)
    user: User

    @ManyToOne(type => Warehouse, (warehouse) => warehouse)
    warehouse: Warehouse

    @OneToMany(type => EntryRecord, (record) => record.entry, {cascade: true})
    records: EntryRecord[]

}
