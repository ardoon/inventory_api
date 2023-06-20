import { Controller, Get, Post, Patch, Delete, UseGuards, NotFoundException, Query, Param, Body } from '@nestjs/common';
import { OutgoesService } from './outgoes.service';
import { CreateOutgoDto } from './dto/create-outgo.dto';
import { UpdateOutgoDto } from './dto/update-outgo.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateOutgoRecordDto } from './dto/create-outgo-record.dto';
import { CreateDto } from './dto/create.dto';
import { UpdateOutgoRecordDto } from './dto/update-outgo-record.dto';

@ApiTags('Outgoes')
@Controller('outgoes')
@UseGuards(AuthGuard)
export class OutgoesController {
  constructor(private readonly outgoesService: OutgoesService) {}

  @Post()
  create(@Body() data: CreateDto) {
    return this.outgoesService.create(data);
  }

  @Post('/records/:id')
  createRecords(@Param('id') id: string, @Body() records: CreateOutgoRecordDto[]) {
    return this.outgoesService.createRecords(+id, records);
  }

  // @ApiQuery({
  //   name: 'parentId',
  //   type: Number,
  //   required: false
  // })
  @Get()
  findAll() {
    return this.outgoesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const outgo = await this.outgoesService.findOne(+id);
    if(!outgo) {
      throw new NotFoundException('Outgo not exists!');
    }
    return outgo;
  }

  @Get('records/:id')
  async findOneRecord(@Param('id') id: string) {
    const record = await this.outgoesService.findOneRecord(+id);
    if(!record) {
      throw new NotFoundException('Record not exists!');
    }
    return record;
  }

  @Patch('records/:id')
  updateRecord(@Param('id') id: string, @Body() updateOutgoRecordDto: UpdateOutgoRecordDto) {     
    return this.outgoesService.updateRecord(+id, updateOutgoRecordDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOutgoDto: UpdateOutgoDto) { 
    return this.outgoesService.update(+id, updateOutgoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.outgoesService.remove(+id);
  }

  @Delete('records/:id')
  removeRecord(@Param('id') id: string) {
    return this.outgoesService.removeRecord(+id);
  }
}