import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO, EditUserDTO } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  create(userDTO: CreateUserDTO): Promise<User> {
    const user = new User();
    user.fullName = userDTO.fullName;
    user.email = userDTO.email;

    return this.usersRepository.save(user);
  }

  update(id: number, userDTO: EditUserDTO): Promise<UpdateResult> {
    return this.usersRepository.update(id, { ...userDTO });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
