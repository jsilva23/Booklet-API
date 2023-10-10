import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EditBookDTO, AddBookDTO } from './dto';
import { BooksService } from './books.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
// import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(RolesGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Roles(Role.USER)
  @Get()
  index() {
    return this.booksService.findAll();
  }

  @Post()
  addBook(@Body() addBookDTO: AddBookDTO) {
    return this.booksService.create(addBookDTO);
  }

  @Get(':id')
  findOneBook(@Param('id') bookId: number) {
    return this.booksService.findOne(bookId);
  }

  @Patch(':id')
  updateBook(@Param('id') bookId: number, @Body() editBookDTO: EditBookDTO) {
    return this.booksService.update(bookId, editBookDTO);
  }

  @Delete(':id')
  removeBook(@Param('id') bookId: number) {
    return this.booksService.remove(bookId);
  }
}
