import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { EditAuthorDTO, CreateAuthorDTO } from './dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) { }

  @Get()
  index() {
    return this.authorsService.findAll();
  }

  @Post()
  create(@Body() createUserDTO: CreateAuthorDTO) {
    return this.authorsService.create(createUserDTO);
  }

  @Get(':id')
  findOneUser(@Param('id') authorId: number) {
    return this.authorsService.findOne(authorId);
  }

  @Patch(':id')
  updateUser(
    @Param('id') authorId: number,
    @Body() editAuthorDTO: EditAuthorDTO,
  ) {
    return this.authorsService.update(authorId, editAuthorDTO);
  }

  @Delete(':id')
  removeUser(@Param('id') userId: number) {
    return this.authorsService.remove(userId);
  }
}
