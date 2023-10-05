import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class EditAuthorDTO {
  @IsNotEmpty()
  @IsOptional()
  fullName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
