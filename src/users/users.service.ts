import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO, EditUserDTO } from './dto';
import { CredentialRole } from 'src/credentials/credential_role';
import { Credential } from 'src/credentials/credential.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(
    userDTO: CreateUserDTO,
  ): Promise<{ user: User; credential: Credential }> {
    const user = new User();
    user.fullName = userDTO.fullName;

    await this.dataSource.transaction(async (transactionEntityManager) => {
      await transactionEntityManager.save(user);

      const credential = new Credential();
      credential.email = userDTO.email;
      credential.passwordHash = await argon2.hash(userDTO.password);
      credential.credentialableId = user.id;
      credential.credentialableType = 'user';
      credential.role = CredentialRole.USER;

      await transactionEntityManager.save(credential);
    });

    return { user: user, credential: user.credential };
  }

  update(id: number, userDTO: EditUserDTO): Promise<UpdateResult> {
    return this.usersRepository.update(id, { ...userDTO });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
