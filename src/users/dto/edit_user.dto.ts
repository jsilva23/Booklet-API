import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class EditUserDTO {
  @IsNotEmpty()
  @IsOptional()
  fullName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
