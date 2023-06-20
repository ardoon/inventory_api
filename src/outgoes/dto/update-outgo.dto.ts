import { PartialType } from '@nestjs/swagger';
import { CreateOutgoDto } from './create-outgo.dto';

export class UpdateOutgoDto extends PartialType(CreateOutgoDto) {}
