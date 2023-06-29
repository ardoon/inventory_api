import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    name: string;

    @IsNumber()
    unitId: number;

    @IsNumber()
    categoryId: number;
    
    @IsNumber()
    @IsOptional()
    secondaryUnitId?: number;
    
    @IsNumber()
    @IsOptional()
    unitsRatio?: number;

    @IsNumber()
    @IsOptional()
    amount?: number;

}
