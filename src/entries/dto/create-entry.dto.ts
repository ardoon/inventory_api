import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNumber, IsString } from "class-validator";

export class CreateEntryDto {

    @ApiProperty()
    @IsString()
    date: string;

    @ApiProperty()
    @IsAlphanumeric()
    receptNo: string;

    @ApiProperty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsNumber()
    warehouseId: number;

}
