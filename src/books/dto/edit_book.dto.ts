import { IsNotEmpty, IsOptional } from 'class-validator';

export class EditBookDTO {
  @IsNotEmpty()
  @IsOptional()
  title?: string;

}
