import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { EntryRecord } from './entities/entry-record.entry';

@Module({
  imports: [TypeOrmModule.forFeature([Entry, EntryRecord])],
  controllers: [EntriesController],
  providers: [EntriesService]
})
export class EntriesModule {}
