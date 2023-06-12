import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UnitsService } from 'src/units/units.service';
import { Unit } from 'src/units/entities/unit.entity';

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private productsRepository: Repository<Product>, private unitsService: UnitsService) {}

  async create(createProductDto: CreateProductDto) {
    const product: Product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  findAll(categoryId: number) {
    return this.productsRepository.findBy({categoryId});
  }

  getProducts() {
    return this.productsRepository.find();
  }

  async getUnits(productId: number) {
    const product: Product = await this.checkDuplicationAndGetProduct(productId);
    const unit: Unit = await this.unitsService.findOne(product.unitId);
    if(product.secondaryUnitId) {
      const secondaryUnit: Unit = await this.unitsService.findOne(product.secondaryUnitId);
      return [unit, secondaryUnit];
    }
    return [unit];
  }

  async findOne(id: number) {
    const product: Product = await this.checkDuplicationAndGetProduct(id);
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product: Product = await this.checkDuplicationAndGetProduct(id);
    Object.assign(product, updateProductDto);
    return await this.productsRepository.save(product);
  }

  async remove(id: number) {
    const product: Product = await this.checkDuplicationAndGetProduct(id);
    return this.productsRepository.remove(product);
  }

  private async checkDuplicationAndGetProduct(id: number) {
    const product: Product = await this.productsRepository.findOneBy({id});
    if(!product) {
      throw new NotFoundException('Product not exists!');
    } 
    return product;
  }

}
