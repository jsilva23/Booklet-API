import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { CreateAdminDTO, EditAdminDTO } from './dto';
import { CredentialRole } from 'src/credentials/credential_role';
import { Credential } from 'src/credentials/credential.entity';
import * as argon2 from 'argon2';

@Injectable()
export class AdminsService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Admin) private adminsRepository: Repository<Admin>,
  ) { }

  findAll(): Promise<Admin[]> {
    return this.adminsRepository.find();
  }

  findOne(id: number): Promise<Admin | null> {
    return this.adminsRepository.findOneBy({ id });
  }

  async create(
    adminDTO: CreateAdminDTO,
  ): Promise<{ user: Admin; credential: Credential }> {
    const admin = new Admin();
    admin.fullName = adminDTO.fullName;

    await this.dataSource.transaction(async (transactionEntityManager) => {
      await transactionEntityManager.save(admin);

      const credential = new Credential();
      credential.email = adminDTO.email;
      credential.passwordHash = await argon2.hash(adminDTO.password);
      credential.credentialableId = admin.id;
      credential.credentialableType = 'admin';
      credential.role = CredentialRole.ADMIN;

      await transactionEntityManager.save(credential);
    });

    return { user: admin, credential: admin.credential };
  }

  update(id: number, adminDTO: EditAdminDTO): Promise<UpdateResult> {
    return this.adminsRepository.update(id, { ...adminDTO });
  }

  async remove(id: number): Promise<void> {
    await this.adminsRepository.delete(id);
  }
}
