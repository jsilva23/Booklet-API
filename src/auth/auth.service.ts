import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthorsService } from 'src/authors/authors.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private authorsService: AuthorsService,
    private jwtService: JwtService,
  ) { }

  async signIn(email: string, password: string): Promise<any> {
    const author = await this.authorsService.findOneByEmail(email);
    if (await argon2.verify(author?.passwordHash, password)) {
      const payload = { sub: author.id, email: author.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
