import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UnitsModule } from 'src/units/units.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), UnitsModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
