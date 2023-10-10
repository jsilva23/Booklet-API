import { IsNotEmpty } from 'class-validator';

export class AddBookDTO {
  @IsNotEmpty()
  title: string;

}
