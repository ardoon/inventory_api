import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class SectionsService {

  constructor(@InjectRepository(Section) private sectionsRepository: Repository<Section>) {}

  async create(createSectionDto: CreateSectionDto) {

    const {name, parentId}: {name: string, parentId?: number} = createSectionDto;

    if(parentId) {
      const parent = await this.sectionsRepository.findBy({id: parentId});
      if(!parent) {
        throw new BadRequestException('Parent section with given id not exists!')
      }
    }

    const sections = await this.sectionsRepository.findBy({name});

    if(sections.length) {
      throw new BadRequestException(`There is a ${name} section!`);
    }

    const section = this.sectionsRepository.create(createSectionDto);

    return this.sectionsRepository.save(section);

  }

  async findAll(parentId?: number) {
    if(parentId) {
      return await this.sectionsRepository.findBy({parentId});
    }
    return await this.sectionsRepository.find({where: {parentId: IsNull()}});
  }

  findOne(id: number) {
    return this.sectionsRepository.findOneBy({id});
  }

  async update(id: number, name: string) {
    const sections = await this.sectionsRepository.findBy({name});
    if(sections.length) {
      throw new BadRequestException(`There is a ${name} section!`);
    }

    const section = await this.sectionsRepository.findOneBy({id});
    if(!section) {
      throw new NotFoundException("Section not exists!");
    }
    Object.assign(section, {name});
    return this.sectionsRepository.save(section);
  }

  async remove(id: number) {
    const section = await this.sectionsRepository.findOneBy({id});
    if(!section) {
      throw new NotFoundException("Section not exists!");
    }
    return this.sectionsRepository.remove(section);
  }
}
