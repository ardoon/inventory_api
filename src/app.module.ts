import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot({
    type: "sqlite",
    database: "db.sqlite",
    synchronize:true,
    autoLoadEntities: true
  }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
