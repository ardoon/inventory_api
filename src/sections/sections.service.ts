import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SectionsService {

  constructor(@InjectRepository(Section) private sectionsRepository: Repository<Section>) {}

  async create(name: string) {
    const sections = await this.sectionsRepository.findBy({name});
    if(sections.length) {
      throw new BadRequestException(`There is a ${name} section!`);
    }

    const section = this.sectionsRepository.create({name});
    return this.sectionsRepository.save(section);
  }

  findAll() {
    return this.sectionsRepository.find();
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
