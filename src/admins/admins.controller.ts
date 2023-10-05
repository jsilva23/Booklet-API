import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDTO, EditAdminDTO } from './dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) { }

  @Get()
  index() {
    return this.adminsService.findAll();
  }

  @Post()
  create(@Body() createAdminDTO: CreateAdminDTO) {
    return this.adminsService.create(createAdminDTO);
  }

  @Get(':id')
  findOneUser(@Param('id') userId: number) {
    return this.adminsService.findOne(userId);
  }

  @Patch(':id')
  updateUser(@Param('id') userId: number, @Body() editUserDTO: EditAdminDTO) {
    return this.adminsService.update(userId, editUserDTO);
  }

  @Delete(':id')
  removeUser(@Param('id') userId: number) {
    return this.adminsService.remove(userId);
  }
}
