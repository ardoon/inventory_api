import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Sections')
@Controller('sections')
@UseGuards(AuthGuard)
export class SectionsController {
  constructor(private readonly sectionService: SectionsService) {}

  @Post()
  create(@Body() createUnitDto: CreateSectionDto) {
    return this.sectionService.create(createUnitDto.name);
  }

  @Get()
  findAll() {
    return this.sectionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const section = await this.sectionService.findOne(+id);
    if(!section) {
      throw new NotFoundException('Section not exists!');
    }
    return section;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnitDto: UpdateSectionDto) {
    return this.sectionService.update(+id, updateUnitDto.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionService.remove(+id);
  }
}
