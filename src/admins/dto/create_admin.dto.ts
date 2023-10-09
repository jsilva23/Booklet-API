import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAdminDTO {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string
}
