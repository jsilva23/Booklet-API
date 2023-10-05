import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  providers: [AdminsService],
  controllers: [AdminsController],
})
export class AdminsModule { }
