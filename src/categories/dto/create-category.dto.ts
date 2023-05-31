import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {

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
