import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WarehousesService {

  constructor(@InjectRepository(Warehouse) private warehousesRepository: Repository<Warehouse>) {}

  async create(name: string) {
    const warehouses = await this.warehousesRepository.findBy({name});
    if(warehouses.length) {
      throw new BadRequestException(`There is a ${name} warehouse!`);
    }

    const warehouse = this.warehousesRepository.create({name});
    return this.warehousesRepository.save(warehouse);
  }

  findAll() {
    return this.warehousesRepository.find();
  }

  findOne(id: number) {
    return this.warehousesRepository.findOneBy({id});
  }

  async update(id: number, name: string) {
    const warehouses = await this.warehousesRepository.findBy({name});
    if(warehouses.length) {
      throw new BadRequestException(`There is a ${name} warehouse!`);
    }

    const warehouse = await this.warehousesRepository.findOneBy({id});
    if(!warehouse) {
      throw new NotFoundException("Warehouse not exists!");
    }
    Object.assign(warehouse, {name});
    return this.warehousesRepository.save(warehouse);
  }

  async remove(id: number) {
    const warehouse = await this.warehousesRepository.findOneBy({id});
    if(!warehouse) {
      throw new NotFoundException("Section not exists!");
    }
    return this.warehousesRepository.remove(warehouse);
  }
}
