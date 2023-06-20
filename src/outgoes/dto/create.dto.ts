import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateOutgoDto } from "./create-outgo.dto";
import { CreateOutgoRecordDto } from "./create-outgo-record.dto";

export class CreateDto {

    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateOutgoDto)
    outgo: CreateOutgoDto;

    @ApiProperty({
        example: [{
            productId: 1,
            amount: 0,
            unitId: 1,
            price: 1,
            description: "string"
        }]
    })
    @ValidateNested({ each: true })
    @Type(() => CreateOutgoRecordDto)
    records: CreateOutgoRecordDto[];

}
