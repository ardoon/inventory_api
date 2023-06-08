import { PartialType } from '@nestjs/swagger';
import { CreateEntryRecordDto } from './create-entry-record.dto';

export class UpdateEntryRecordDto extends PartialType(CreateEntryRecordDto) {}
