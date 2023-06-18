import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Entry } from "./entry.entity";
import { Product } from "src/products/entities/product.entity";
import { Unit } from "src/units/entities/unit.entity";

@Entity()
export class EntryRecord {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Product, (product) => product)
    product: Product

    @Column()
    amount: number;

    @ManyToOne(type => Unit, (unit) => unit)
    unit: Unit

    @Column()
    price: number;

    @Column()
    description: string;

    @ManyToOne(type => Entry, (entry) => entry.records, { onDelete: "CASCADE"})
    entry: Entry
}
