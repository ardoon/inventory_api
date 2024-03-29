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
import { UpdateEntryRecordDto } from './dto/update-entry-record.dto';
import { ProductsService } from 'src/products/products.service';
import { UnitsService } from 'src/units/units.service';
import { Product } from 'src/products/entities/product.entity';
import { Unit } from 'src/units/entities/unit.entity';
import { CreateEntryRecordDto } from './dto/create-entry-record.dto';

@Injectable()
export class EntriesService {

  constructor(
    @InjectRepository(Entry) private entriesRepository: Repository<Entry>,
    @InjectRepository(EntryRecord) private recordsRepository: Repository<EntryRecord>,
    private readonly usersService: UsersService,
    private readonly warehousesService: WarehousesService,
    private readonly productsService: ProductsService,
    private readonly unitsService: UnitsService
  ) { }

  async create(data: CreateDto) {
    const entry = this.entriesRepository.create(data.entry);
    const user: User = await this.usersService.findOne(data.entry.userId);
    const warehouse: Warehouse = await this.warehousesService.findOne(data.entry.warehouseId);
    entry.user = user;
    entry.warehouse = warehouse;

    let newRecords: EntryRecord[] = [];

    await Promise.all(data.records.map(async (record) => {
      const rec: EntryRecord = this.recordsRepository.create(record);
      const product: Product = await this.productsService.findOne(record.productId);
      product.amount += record.amount;
      await this.productsService.update(product.id, product);
      const unit: Unit = await this.unitsService.findOne(record.unitId);  
      rec.product = product;
      rec.unit = unit;      
      newRecords.push(rec);
    }));
    entry.records = newRecords;
    return await this.entriesRepository.save(entry);
  }

  async createRecords(id: number, records: CreateEntryRecordDto[]) {

    const entry = await this.entriesRepository.findOne({
      where: { id },
      relations: {
        records: {
          product: true,
          unit: true
        }
      }
    });
    if(!entry) {
      throw new BadRequestException('Entry not exists!');
    }

    let newRecords: EntryRecord[] = [];

    await Promise.all(records.map(async (record) => {
      const rec: EntryRecord = this.recordsRepository.create(record);
      const product: Product = await this.productsService.findOne(record.productId);
      const unit: Unit = await this.unitsService.findOne(record.unitId);  
      product.amount += record.amount;
      await this.productsService.update(product.id, product);
      rec.product = product;
      rec.unit = unit;      
      newRecords.push(rec);
    }));    

    if(entry.records.length > 0) {
      entry.records = [...entry.records, ...newRecords]
    } else {
      entry.records = newRecords
    }
    
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

  findOneRecord(id: number) {
    return this.recordsRepository.findOne({
      where: { id },
      relations: {
        product: true,
        unit: true
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

  async updateRecord(id: number, data: UpdateEntryRecordDto) {
    const record: EntryRecord = await this.recordsRepository.findOneBy({id});
    if(!record) {
      throw new BadRequestException('Record not exists!');
    }

    const product: Product = await this.productsService.findOne(data.productId);
    const unit: Unit = await this.unitsService.findOne(data.unitId);

    if(record.amount !== data.amount) {
      let amount: number = 0;
      if(record.amount > data.amount) {
        amount = record.amount - data.amount
        if((product.amount - amount) >= 0) {
          product.amount -= amount;
        } else {
          throw new BadRequestException("Product's amount can't be negative!")
        }
      } else if(record.amount < data.amount){
        amount = data.amount - record.amount
        product.amount += amount;
      }
      await this.productsService.update(product.id, product);
    }

    Object.assign(record, data);

    record.product = product;
    record.unit = unit;

    return await this.recordsRepository.save(record);
  }

  async remove(id: number) {
    const entry: Entry = await this.entriesRepository.findOne({
      where: {id},
      relations: {
        records: {
          product: true,
          unit: true
        }
      }
    });
    if(!entry) {
      throw new NotFoundException("Entry not exists!");
    }
    await Promise.all(entry.records.map(async (record) => {
      const product: Product = await this.productsService.findOne(record.product.id);
      if(product.amount - record.amount >= 0) {
        product.amount -= record.amount;
        this.productsService.update(product.id, product);
      } else {
        throw new BadRequestException("Product's amount can't be negative!")
      }
    }));  
    return await this.entriesRepository.remove(entry);;
  }
  async removeRecord(id: number) {
    const record: EntryRecord = await this.recordsRepository.findOne({
      where: {id},
      relations: {
        product: true,
        unit: true
      }
    });
    if(!record) {
      throw new NotFoundException("Record not exists!");
    }

    const product: Product = await this.productsService.findOne(record.product.id);
    
    if(product.amount - record.amount >= 0) {
      product.amount -= record.amount;
      this.productsService.update(product.id, product);
    } else {
      throw new BadRequestException("Product's amount can't be negative!")
    }

    return await this.recordsRepository.remove(record);;
  }
}
