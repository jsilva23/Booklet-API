import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateAuthorDTO, EditAuthorDTO } from './dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorsRepository: Repository<Author>,
  ) { }

  findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  findOne(id: number): Promise<Author | null> {
    return this.authorsRepository.findOneBy({ id });
  }

  create(authorDTO: CreateAuthorDTO): Promise<Author> {
    const author = new Author();
    author.fullName = authorDTO.fullName;
    author.email = authorDTO.email;

    return this.authorsRepository.save(author);
  }

  update(id: number, authorDTO: EditAuthorDTO): Promise<UpdateResult> {
    return this.authorsRepository.update(id, { ...authorDTO });
  }

  async remove(id: number): Promise<void> {
    await this.authorsRepository.delete(id);
  }
}
