import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entry } from "./entry.entity";

@Entity()
export class EntryRecord {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    amount: number;

    @Column()
    unitId: number;

    @Column()
    price: number;

    @Column()
    description: string;

    @ManyToOne(type => Entry, (entry) => entry.records)
    entry: Entry
}
