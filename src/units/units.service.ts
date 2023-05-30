import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnitsService {

  constructor(@InjectRepository(Unit) private unitsRepository: Repository<Unit>) {}

  async create(name: string) {
    const units = await this.unitsRepository.findBy({name});
    if(units.length) {
      throw new BadRequestException(`There is a ${name} unit!`);
    }

    const unit = this.unitsRepository.create({name});
    return this.unitsRepository.save(unit);
  }

  findAll() {
    return this.unitsRepository.find();
  }

  findOne(id: number) {
    return this.unitsRepository.findOneByOrFail({id});
  }

  async update(id: number, name: string) {
    const units = await this.unitsRepository.findBy({name});
    if(units.length) {
      throw new BadRequestException(`There is a ${name} unit!`);
    }

    const unit = await this.unitsRepository.findOneBy({id});
    if(!unit) {
      throw new NotFoundException("Unit not exists!");
    }
    Object.assign(unit, {name});
    return this.unitsRepository.save(unit);
  }

  async remove(id: number) {
    const unit = await this.unitsRepository.findOneBy({id});
    if(!unit) {
      throw new NotFoundException("Unit not exists!");
    }
    return this.unitsRepository.remove(unit);
  }
}
