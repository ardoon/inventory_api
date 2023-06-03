import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column()
    unitId: number;
    
    @Column({
        nullable: true
    })
    secondaryUnitId: number;
    
    @Column({
        nullable: true
    })
    unitsRatio: number;

    @Column()
    categoryId: number;

}
