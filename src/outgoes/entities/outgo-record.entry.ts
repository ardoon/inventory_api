import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/products/entities/product.entity";
import { Unit } from "src/units/entities/unit.entity";
import { Outgo } from "./outgo.entity";

@Entity()
export class OutgoRecord extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Product, (product) => product)
    product: Product

    @Column()
    amount: number;

    @ManyToOne(type => Unit, (unit) => unit)
    unit: Unit

    @Column()
    description: string;

    @ManyToOne(type => Outgo, (outgo) => outgo.records, { onDelete: "CASCADE" })
    outgo: Outgo
}
