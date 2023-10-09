import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { EditAuthorDTO, CreateAuthorDTO } from './dto';
import { Public } from 'src/auth/decorators/public.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) { }

  @Get()
  index() {
    return this.authorsService.findAll();
  }

  @Public()
  @Post()
  create(@Body() createAuthorDTO: CreateAuthorDTO) {
    return this.authorsService.create(createAuthorDTO);
  }

  @Get(':id')
  findOneAuthor(@Param('id') authorId: number) {
    return this.authorsService.findOne(authorId);
  }

  @Patch(':id')
  updateAuthor(
    @Param('id') authorId: number,
    @Body() editAuthorDTO: EditAuthorDTO,
  ) {
    return this.authorsService.update(authorId, editAuthorDTO);
  }

  @Delete(':id')
  removeAuthor(@Param('id') authorId: number) {
    return this.authorsService.remove(authorId);
  }
}
