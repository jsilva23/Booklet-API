import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EditBookDTO, AddBookDTO } from './dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Get()
  index() {
    return this.booksService.findAll();
  }

  @Post()
  create(@Body() addBookDTO: AddBookDTO) {
    return this.booksService.create(addBookDTO);
  }

  @Get(':id')
  findOneUser(@Param('id') bookId: number) {
    return this.booksService.findOne(bookId);
  }

  @Patch(':id')
  updateUser(@Param('id') bookId: number, @Body() editBookDTO: EditBookDTO) {
    return this.booksService.update(bookId, editBookDTO);
  }

  @Delete(':id')
  removeUser(@Param('id') bookId: number) {
    return this.booksService.remove(bookId);
  }
}
