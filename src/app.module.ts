import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UnitsModule } from './units/units.module';
import { SectionsModule } from './sections/sections.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { EntriesModule } from './entries/entries.module';
import { OutgoesModule } from './outgoes/outgoes.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: "sqlite",
    database: "db.sqlite",
    synchronize:true,
    autoLoadEntities: true
  }), AuthModule, UnitsModule, SectionsModule, WarehousesModule, CategoriesModule, ProductsModule, EntriesModule, OutgoesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
