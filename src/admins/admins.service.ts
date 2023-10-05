import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateAdminDTO, EditAdminDTO } from './dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private adminsRepository: Repository<Admin>,
  ) { }

  findAll(): Promise<Admin[]> {
    return this.adminsRepository.find();
  }

  findOne(id: number): Promise<Admin | null> {
    return this.adminsRepository.findOneBy({ id });
  }

  create(adminDTO: CreateAdminDTO): Promise<Admin> {
    const admin = new Admin();
    admin.fullName = adminDTO.fullName;
    admin.email = adminDTO.email;

    return this.adminsRepository.save(admin);
  }

  update(id: number, adminDTO: EditAdminDTO): Promise<UpdateResult> {
    return this.adminsRepository.update(id, { ...adminDTO });
  }

  async remove(id: number): Promise<void> {
    await this.adminsRepository.delete(id);
  }
}
