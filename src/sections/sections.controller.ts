import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, NotFoundException, Query, ParseIntPipe } from '@nestjs/common';
import { SectionsService } from './sections.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Sections')
@Controller('sections')
@UseGuards(AuthGuard)
export class SectionsController {
  constructor(private readonly sectionService: SectionsService) {}

  @Post()
  create(@Body() createUnitDto: CreateSectionDto) {
    return this.sectionService.create(createUnitDto);
  }

  @ApiQuery({
    name: 'parentId',
    type: Number,
    required: false
  })
  @Get()
  findAll(@Query('parentId') parentId?: number) {
    return this.sectionService.findAll(parentId);
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
  update(@Param('id') id: string, @Body() updateSectionDto: UpdateSectionDto) {
    return this.sectionService.update(+id, updateSectionDto.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sectionService.remove(+id);
  }
}
