import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { EntryRecord } from './entities/entry-record.entry';
import { UsersModule } from 'src/users/users.module';
import { WarehousesModule } from 'src/warehouses/warehouses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Entry, EntryRecord]), UsersModule, WarehousesModule],
  controllers: [EntriesController],
  providers: [EntriesService]
})
export class EntriesModule {}
