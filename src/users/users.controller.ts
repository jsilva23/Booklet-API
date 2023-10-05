import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO, EditUserDTO } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  index() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.create(createUserDTO);
  }

  @Get(':id')
  findOneUser(@Param('id') userId: number) {
    return this.usersService.findOne(userId);
  }

  @Patch(':id')
  updateUser(@Param('id') userId: number, @Body() editUserDTO: EditUserDTO) {
    return this.usersService.update(userId, editUserDTO);
  }

  @Delete(':id')
  removeUser(@Param('id') userId: number) {
    return this.usersService.remove(userId);
  }
}
