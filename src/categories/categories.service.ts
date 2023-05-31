import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) {}

  async create(createCategoryDto: CreateCategoryDto) {

    const {name, parentId}: {name: string, parentId?: number} = createCategoryDto;

    if(parentId) {
      const parent = await this.categoriesRepository.findBy({id: parentId});
      if(!parent) {
        throw new BadRequestException('Parent category with given id not exists!')
      }
    }

    const categories = await this.categoriesRepository.findBy({name});

    if(categories.length) {
      throw new BadRequestException(`There is a ${name} category!`);
    }

    const category = this.categoriesRepository.create(createCategoryDto);

    return this.categoriesRepository.save(category);

  }

  async findAll(parentId?: number) {
    if(parentId) {
      return await this.categoriesRepository.findBy({parentId});
    }
    return await this.categoriesRepository.find({where: {parentId: IsNull()}});
  }

  findOne(id: number) {
    return this.categoriesRepository.findOneBy({id});
  }

  async update(id: number, name: string) {
    const categories = await this.categoriesRepository.findBy({name});
    if(categories.length) {
      throw new BadRequestException(`There is a ${name} category!`);
    }

    const category = await this.categoriesRepository.findOneBy({id});
    if(!category) {
      throw new NotFoundException("Category not exists!");
    }
    Object.assign(category, {name});
    return this.categoriesRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.categoriesRepository.findOneBy({id});
    if(!category) {
      throw new NotFoundException("Category not exists!");
    }
    return this.categoriesRepository.remove(category);
  }
}
