
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';

import { Author } from './author.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateAuthorDTO, EditAuthorDTO } from './dto';
import { Credential } from 'src/credentials/credential.entity';
import { CredentialRole } from 'src/credentials/credential_role';

@Injectable()
export class AuthorsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Author) private authorsRepository: Repository<Author>,
  ) { }

  findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  findOne(id: number): Promise<Author | null> {
    return this.authorsRepository.findOneBy({ id });
  }

  // findOneByEmail(email: string): Promise<Author | null> {
  //   return this.authorsRepository.findOneBy({ email });
  // }

  async create(
    authorDTO: CreateAuthorDTO,
  ): Promise<{ user: Author; credential: Credential }> {
    const author = new Author();
    author.fullName = authorDTO.fullName;

    await this.dataSource.transaction(async (transactionEntityManager) => {
      await transactionEntityManager.save(author);

      const credential = new Credential();
      credential.email = authorDTO.email;
      credential.passwordHash = await argon2.hash(authorDTO.password);
      credential.credentialableId = author.id;
      credential.credentialableType = 'author';
      credential.role = CredentialRole.AUTHOR;

      await transactionEntityManager.save(credential);
    });

    return { user: author, credential: author.credential };
  }

  update(id: number, authorDTO: EditAuthorDTO): Promise<UpdateResult> {
    return this.authorsRepository.update(id, { ...authorDTO });
  }

  async remove(id: number): Promise<void> {
    await this.authorsRepository.delete(id);
  }
}
