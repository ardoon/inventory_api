import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { EntryRecord } from './entities/entry-record.entry';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { WarehousesService } from 'src/warehouses/warehouses.service';
import { Warehouse } from 'src/warehouses/entities/warehouse.entity';

@Injectable()
export class EntriesService {

  constructor(
    @InjectRepository(Entry) private entriesRepository: Repository<Entry>,
    @InjectRepository(EntryRecord) private recordsRepository: Repository<EntryRecord>,
    private readonly usersService: UsersService,
    private readonly warehousesService: WarehousesService
  ) { }

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

  async findAll() {
    return await this.entriesRepository.find({
      select: {
        user: {
          id: true,
          name: true
        },
        records: {
          id: true
        }
      },
      relations: {
        records: true,
        user: true,
        warehouse: true
      }
    });
  }

  findOne(id: number) {
    return this.entriesRepository.findOne({
      where: { id },
      select: {
        user: {
          id: true,
          name: true
        }
      },
      relations: {
        records: {
          product: true,
          unit: true
        },
        user: true,
        warehouse: true
      }
    });
  }

  async update(id: number, data: UpdateEntryDto) {
    const entry: Entry = await this.entriesRepository.findOneBy({id});
    if(!entry) {
      throw new BadRequestException('Entry not exists!');
    }

    const user: User = await this.usersService.findOne(data.userId);
    const warehouse: Warehouse = await this.warehousesService.findOne(data.warehouseId);

    Object.assign(entry, data);

    entry.user = user;
    entry.warehouse = warehouse;

    return await this.entriesRepository.save(entry);
  }

  // async remove(id: number) {
  //   const category = await this.entriesRepository.findOneBy({id});
  //   if(!category) {
  //     throw new NotFoundException("Category not exists!");
  //   }
  //   return this.entriesRepository.remove(category);
  // }
}
