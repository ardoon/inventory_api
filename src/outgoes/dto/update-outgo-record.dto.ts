import { PartialType } from '@nestjs/swagger';
import { CreateOutgoRecordDto } from './create-outgo-record.dto';

export class UpdateOutgoRecordDto extends PartialType(CreateOutgoRecordDto) {}
