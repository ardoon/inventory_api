import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntryRecord } from "./entry-record.entry";

@Entity()
export class Entry {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime' })
    @Index()
    date: string;

    @Column()
    receptNo: string;

    @Column()
    userId: number;

    @Column()
    warehouseId: number;

    @OneToMany(type => EntryRecord, (record) => record.entry, {cascade: true})
    records: EntryRecord[]

}