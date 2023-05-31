import { Controller, Get, Post, Patch, Delete, UseGuards, NotFoundException, Query, Param, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Categories')
@Controller('categories')
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiQuery({
    name: 'parentId',
    type: Number,
    required: false
  })
  @Get()
  findAll(@Query('parentId') parentId?: number) {
    return this.categoriesService.findAll(parentId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const section = await this.categoriesService.findOne(+id);
    if(!section) {
      throw new NotFoundException('Section not exists!');
    }
    return section;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(+id, updateCategoryDto.name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}