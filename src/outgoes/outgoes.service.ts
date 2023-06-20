import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Outgo } from './entities/outgo.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';
import { OutgoRecord } from './entities/outgo-record.entry';
import { UpdateOutgoDto } from './dto/update-outgo.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { SectionsService } from 'src/sections/sections.service';
import { Section } from 'src/sections/entities/section.entity';
import { UpdateOutgoRecordDto } from './dto/update-outgo-record.dto';
import { ProductsService } from 'src/products/products.service';
import { UnitsService } from 'src/units/units.service';
import { Product } from 'src/products/entities/product.entity';
import { Unit } from 'src/units/entities/unit.entity';
import { CreateOutgoRecordDto } from './dto/create-outgo-record.dto';

@Injectable()
export class OutgoesService {

  constructor(
    @InjectRepository(Outgo) private outgoesRepository: Repository<Outgo>,
    @InjectRepository(OutgoRecord) private recordsRepository: Repository<OutgoRecord>,
    private readonly usersService: UsersService,
    private readonly sectionsService: SectionsService,
    private readonly productsService: ProductsService,
    private readonly unitsService: UnitsService
  ) { }

  async create(data: CreateDto) {
    const outgo = this.outgoesRepository.create(data.outgo);
    const user: User = await this.usersService.findOne(data.outgo.userId);
    const section: Section = await this.sectionsService.findOne(data.outgo.sectionId);
    outgo.user = user;
    outgo.section = section;

    let newRecords: OutgoRecord[] = [];

    await Promise.all(data.records.map(async (record) => {
      const rec: OutgoRecord = this.recordsRepository.create(record);
      const product: Product = await this.productsService.findOne(record.productId);
      if ((product.amount - record.amount) >= 0) {
        product.amount -= record.amount;
      } else {
        throw new BadRequestException("Product's amount can't be negative!")
      }
      await this.productsService.update(product.id, product);
      const unit: Unit = await this.unitsService.findOne(record.unitId);
      rec.product = product;
      rec.unit = unit;
      newRecords.push(rec);
    }));
    outgo.records = newRecords;
    return await this.outgoesRepository.save(outgo);
  }

  async createRecords(id: number, records: CreateOutgoRecordDto[]) {

    const outgo = await this.outgoesRepository.findOne({
      where: { id },
      relations: {
        records: {
          product: true,
          unit: true
        }
      }
    });
    if (!outgo) {
      throw new BadRequestException('Outgo not exists!');
    }

    let newRecords: OutgoRecord[] = [];

    await Promise.all(records.map(async (record) => {
      const rec: OutgoRecord = this.recordsRepository.create(record);
      const product: Product = await this.productsService.findOne(record.productId);
      const unit: Unit = await this.unitsService.findOne(record.unitId);
      if ((product.amount - record.amount) >= 0) {
        product.amount -= record.amount;
      } else {
        throw new BadRequestException("Product's amount can't be negative!")
      }
      await this.productsService.update(product.id, product);
      rec.product = product;
      rec.unit = unit;
      newRecords.push(rec);
    }));

    if (outgo.records.length > 0) {
      outgo.records = [...outgo.records, ...newRecords]
    } else {
      outgo.records = newRecords
    }

    return await this.outgoesRepository.save(outgo);
  }

  async findAll() {
    return await this.outgoesRepository.find({
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
        section: true
      }
    });
  }

  findOne(id: number) {
    return this.outgoesRepository.findOne({
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
        section: true
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

  async update(id: number, data: UpdateOutgoDto) {
    const outgo: Outgo = await this.outgoesRepository.findOneBy({ id });
    if (!outgo) {
      throw new BadRequestException('Outgo not exists!');
    }

    const user: User = await this.usersService.findOne(data.userId);
    const section: Section = await this.sectionsService.findOne(data.sectionId);

    Object.assign(outgo, data);

    outgo.user = user;
    outgo.section = section;

    return await this.outgoesRepository.save(outgo);
  }

  async updateRecord(id: number, data: UpdateOutgoRecordDto) {
    const record: OutgoRecord = await this.recordsRepository.findOneBy({ id });
    if (!record) {
      throw new BadRequestException('Record not exists!');
    }

    const product: Product = await this.productsService.findOne(data.productId);
    const unit: Unit = await this.unitsService.findOne(data.unitId);

    if (record.amount !== data.amount) {
      let amount: number = 0;
      if (record.amount > data.amount) {
        amount = record.amount - data.amount
        product.amount += amount;
      } else if (record.amount < data.amount) {
        amount = data.amount - record.amount
        if ((record.amount - amount >= 0)) {
          product.amount -= amount;
        } else {
          throw new BadRequestException("Product's amount can't be negative!")
        }
      }
      await this.productsService.update(product.id, product);
    }

    Object.assign(record, data);

    record.product = product;
    record.unit = unit;

    return await this.recordsRepository.save(record);
  }

  async remove(id: number) {
    const outgo: Outgo = await this.outgoesRepository.findOne({
      where: { id },
      relations: {
        records: {
          product: true,
          unit: true
        }
      }
    });
    if (!outgo) {
      throw new NotFoundException("Outgo not exists!");
    }
    await Promise.all(outgo.records.map(async (record) => {
      const product: Product = await this.productsService.findOne(record.product.id);
      product.amount += record.amount;
      this.productsService.update(product.id, product);
    }));
    return await this.outgoesRepository.remove(outgo);;
  }
  async removeRecord(id: number) {
    const record: OutgoRecord = await this.recordsRepository.findOne({
      where: { id },
      relations: {
        product: true,
        unit: true
      }
    });
    if (!record) {
      throw new NotFoundException("Record not exists!");
    }

    const product: Product = await this.productsService.findOne(record.product.id);

    product.amount += record.amount;
    this.productsService.update(product.id, product);

    return await this.recordsRepository.remove(record);;
  }
}
