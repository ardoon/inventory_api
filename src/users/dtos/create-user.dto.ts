import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        example: "John Doe"
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: "admin",
        enum: ['admin', 'normal', 'manager']
    })
    @IsString()
    @IsIn(['admin', 'normal', 'manager'])
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
    @IsOptional()
    mobile: string;

    @ApiProperty({
        example: "my-password"
    })
    @IsString()
    @IsOptional()
    password: string;

}