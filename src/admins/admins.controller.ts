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
  findOneAdmin(@Param('id') adminId: number) {
    return this.adminsService.findOne(adminId);
  }

  @Patch(':id')
  updateAdmin(
    @Param('id') adminId: number,
    @Body() editAdminDTO: EditAdminDTO,
  ) {
    return this.adminsService.update(adminId, editAdminDTO);
  }

  @Delete(':id')
  removeAdmin(@Param('id') adminId: number) {
    return this.adminsService.remove(adminId);
  }
}
