import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AddBookDTO, EditBookDTO } from './dto';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    private authorService: AuthorsService,
  ) { }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find({
      relations: {
        author: true,
      },
    });
  }

  findAlthorBooks(authorId: number): Promise<Book[]> {
    return this.booksRepository
      .createQueryBuilder('books')
      .innerJoinAndSelect('books.author', 'author')
      .where('author.id = :id', { id: authorId })
      .getMany();
  }

  findAcceptedBooks(): Promise<Book[]> {
    return this.booksRepository
      .createQueryBuilder('books')
      .innerJoinAndSelect('books.author', 'author')
      .where('books.accepted = :accepted', { accepted: true })
      .getMany();
  }

  async read(id: number): Promise<Book | null> {
    const book = await this.booksRepository
      .createQueryBuilder('books')
      .innerJoinAndSelect('books.author', 'author')
      .where('books.id = :id', { id })
      .getOne();

    if (!book.accepted) throw new UnauthorizedException();

    return book;
  }

  async create(bookDTO: AddBookDTO, authorId: number): Promise<Book> {
    const book = new Book();
    book.title = bookDTO.title;

    const author = await this.authorService.findOne(authorId);
    book.author = author;

    return this.booksRepository.save(book);
  }

  accept(id: number): Promise<UpdateResult> {
    return this.booksRepository.update(id, { accepted: true });
  }

  update(id: number, bookDTO: EditBookDTO): Promise<UpdateResult> {
    return this.booksRepository.update(id, { ...bookDTO });
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
