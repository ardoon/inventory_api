import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { EntryRecord } from './entities/entry-record.entry';

@Injectable()
export class EntriesService {

  constructor(
    @InjectRepository(Entry) private entriesRepository: Repository<Entry>,
    @InjectRepository(EntryRecord) private recordsRepository: Repository<EntryRecord>
  ) {}

  async create(data: CreateDto) {
    const entry = this.entriesRepository.create(data.entry);
    let newRecords: EntryRecord[] = [];
    data.records.forEach(async record => {
      const rec = this.recordsRepository.create(record);
      newRecords.push(rec);
    });
    entry.records = newRecords;
    return await this.entriesRepository.save(entry);
  }

  // async findAll(parentId?: number) {
  //   if(parentId) {
  //     return await this.entriesRepository.findBy({parentId});
  //   }
  //   return await this.entriesRepository.find({where: {parentId: IsNull()}});
  // }

  // findOne(id: number) {
  //   return this.entriesRepository.findOneBy({id});
  // }

  // async update(id: number, name: string) {
  //   const categories = await this.entriesRepository.findBy({name});
  //   if(categories.length) {
  //     throw new BadRequestException(`There is a ${name} category!`);
  //   }

  //   const category = await this.entriesRepository.findOneBy({id});
  //   if(!category) {
  //     throw new NotFoundException("Category not exists!");
  //   }
  //   Object.assign(category, {name});
  //   return this.entriesRepository.save(category);
  // }

  // async remove(id: number) {
  //   const category = await this.entriesRepository.findOneBy({id});
  //   if(!category) {
  //     throw new NotFoundException("Category not exists!");
  //   }
  //   return this.entriesRepository.remove(category);
  // }
}
