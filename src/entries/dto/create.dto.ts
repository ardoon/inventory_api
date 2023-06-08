import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateEntryDto } from "./create-entry.dto";
import { CreateEntryRecordDto } from "./create-entry-record.dto";

export class CreateDto {

    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateEntryDto)
    entry: CreateEntryDto;

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
    @Type(() => CreateEntryRecordDto)
    records: CreateEntryRecordDto[];

}
