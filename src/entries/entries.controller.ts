import { Controller, Get, Post, Patch, Delete, UseGuards, NotFoundException, Query, Param, Body } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateEntryRecordDto } from './dto/create-entry-record.dto';
import { CreateDto } from './dto/create.dto';

@ApiTags('Entries')
@Controller('entries')
@UseGuards(AuthGuard)
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  create(@Body() data: CreateDto) {
    return this.entriesService.create(data);
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEntryDto: UpdateEntryDto) { 
    return this.entriesService.update(+id, updateEntryDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.entriesService.remove(+id);
  // }
}