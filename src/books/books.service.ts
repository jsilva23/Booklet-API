import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AddBookDTO, EditBookDTO } from './dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
  ) { }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  findOne(id: number): Promise<Book | null> {
    return this.booksRepository.findOneBy({ id });
  }

  create(bookDTO: AddBookDTO): Promise<Book> {
    const book = new Book();
    book.title = bookDTO.title;
    book.author = bookDTO.author;

    return this.booksRepository.save(book);
  }

  update(id: number, bookDTO: EditBookDTO): Promise<UpdateResult> {
    return this.booksRepository.update(id, { ...bookDTO });
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
