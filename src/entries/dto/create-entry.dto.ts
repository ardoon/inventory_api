import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsDate, IsDateString, IsNumber, IsString } from "class-validator";

export class CreateEntryDto {

    @ApiProperty()
    @IsDateString()
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
