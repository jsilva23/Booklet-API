import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class EditAdminDTO {
  @IsNotEmpty()
  @IsOptional()
  fullName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
