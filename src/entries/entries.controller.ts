import { Controller, Get, Post, Patch, Delete, UseGuards, NotFoundException, Query, Param, Body } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateEntryRecordDto } from './dto/create-entry-record.dto';
import { CreateDto } from './dto/create.dto';
import { UpdateEntryRecordDto } from './dto/update-entry-record.dto';

@ApiTags('Entries')
@Controller('entries')
@UseGuards(AuthGuard)
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  create(@Body() data: CreateDto) {
    return this.entriesService.create(data);
  }

  @Post('/records/:id')
  createRecords(@Param('id') id: string, @Body() records: CreateEntryRecordDto[]) {
    return this.entriesService.createRecords(+id, records);
  }

  // @ApiQuery({
  //   name: 'parentId',
  //   type: Number,
  //   required: false
  // })
  @Get()
  findAll() {
    return this.entriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const entry = await this.entriesService.findOne(+id);
    if(!entry) {
      throw new NotFoundException('Entry not exists!');
    }
    return entry;
  }

  @Get('records/:id')
  async findOneRecord(@Param('id') id: string) {
    const record = await this.entriesService.findOneRecord(+id);
    if(!record) {
      throw new NotFoundException('Record not exists!');
    }
    return record;
  }

  @Patch('records/:id')
  updateRecord(@Param('id') id: string, @Body() updateEntryRecordDto: UpdateEntryRecordDto) {     
    return this.entriesService.updateRecord(+id, updateEntryRecordDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) { 
    return this.entriesService.update(+id, updateEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entriesService.remove(+id);
  }

  @Delete('records/:id')
  removeRecord(@Param('id') id: string) {
    return this.entriesService.removeRecord(+id);
  }
}