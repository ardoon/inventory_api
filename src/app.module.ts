import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UnitsModule } from './units/units.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: "sqlite",
    database: "db.sqlite",
    synchronize:true,
    autoLoadEntities: true
  }), AuthModule, UnitsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
