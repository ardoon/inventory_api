import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSectionDto {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty({
        nullable: true
    })
    @IsOptional()
    @IsNumber()
    parentId: number;

}
