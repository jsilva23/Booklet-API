import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthorDTO {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;
}
