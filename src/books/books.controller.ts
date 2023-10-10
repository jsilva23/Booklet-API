import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { EditBookDTO, AddBookDTO } from './dto';
import { BooksService } from './books.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(RolesGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Roles(Role.ADMIN)
  @Get()
  index() {
    return this.booksService.findAll();
  }

  @Roles(Role.AUTHOR)
  @Post()
  addBook(@Body() addBookDTO: AddBookDTO, @Request() req: any) {
    const { currentUser: author } = req;
    return this.booksService.create(addBookDTO, author.id);
  }

  @Roles(Role.AUTHOR)
  @Get('mybooks')
  listAuthorBooks(@Request() req: any) {
    const { currentUser: author } = req;
    return this.booksService.findAlthorBooks(author.id);
  }

  @Roles(Role.USER)
  @Get('list')
  listAcceptedBooks() {
    return this.booksService.findAcceptedBooks();
  }

  @Roles(Role.USER)
  @Get('read/:id')
  readBook(@Param('id') bookId: number) {
    return this.booksService.read(bookId);
  }

  @Roles(Role.AUTHOR)
  @Patch(':id')
  updateBook(@Param('id') bookId: number, @Body() editBookDTO: EditBookDTO) {
    return this.booksService.update(bookId, editBookDTO);
  }

  @Roles(Role.ADMIN)
  @Patch('accept/:id')
  acceptBook(@Param('id') bookId: number) {
    return this.booksService.accept(bookId);
  }

  @Roles(Role.ADMIN, Role.AUTHOR)
  @Delete(':id')
  removeBook(@Param('id') bookId: number) {
    return this.booksService.remove(bookId);
  }
}
