import { IsNotEmpty } from 'class-validator';
import { Author } from 'src/authors/author.entity';

export class AddBookDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: Author;
}
