import { Module } from '@nestjs/common';
import { OutgoesService } from './outgoes.service';
import { OutgoesController } from './outgoes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { UnitsModule } from 'src/units/units.module';
import { Outgo } from './entities/outgo.entity';
import { OutgoRecord } from './entities/outgo-record.entry';
import { SectionsModule } from 'src/sections/sections.module';

@Module({
  imports: [TypeOrmModule.forFeature([Outgo, OutgoRecord]), UsersModule, SectionsModule, ProductsModule, UnitsModule],
  controllers: [OutgoesController],
  providers: [OutgoesService]
})
export class OutgoesModule {}
