import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString } from "class-validator";

export class LoginDto {

    @ApiProperty({
        example: "0918*******"
    })
    @IsNumberString()
    mobile: string;

    @ApiProperty({
        example: "my-password"
    })
    @IsString()
    password: string;

}