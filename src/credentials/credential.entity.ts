import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { CredentialRole } from './credential_role';
import { Admin } from 'src/admins/admin.entity';
import { Author } from 'src/authors/author.entity';
import { User } from 'src/users/user.entity';

@Entity({ name: 'credentials' })
@Unique(['credentialableType', 'credentialableId'])
export class Credential {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ type: 'enum', enum: ['admin', 'author', 'user'], default: 'user' })
  role: CredentialRole;

  // Polymorphic columns
  @Column({ name: 'credentialable_type' })
  credentialableType: 'admin' | 'author' | 'user';

  @Column({ name: 'credentialable_id' })
  credentialableId: number;

  @OneToOne(() => Admin, (admin) => admin.credential, { nullable: true })
  admin: Admin;

  @OneToOne(() => Author, (author) => author.credential, { nullable: true })
  author: Author;

  @OneToOne(() => User, (user) => user.credential, { nullable: true })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
