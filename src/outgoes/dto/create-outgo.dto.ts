import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsDateString, IsNumber } from "class-validator";

export class CreateOutgoDto {

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
    sectionId: number;

}
