import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        example: "John Doe"
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: "admin"
    })
    @IsString()
    type: string;

    @ApiProperty({
        example: "Engineer"
    })
    @IsString()
    role: string;

    @ApiProperty({
        example: "0918*******"
    })
    @IsNumberString()
    mobile: string;

}