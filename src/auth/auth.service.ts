import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CredentialsService } from 'src/credentials/credentials.service';

type SigInUserType = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private credentialsService: CredentialsService,
  ) { }

  async signIn({ email, password }: SigInUserType): Promise<any> {

    const credential =
      await this.credentialsService.findCredentialByEmail(email);

    if (!credential) throw new UnauthorizedException();

    if (await argon2.verify(credential.passwordHash, password)) {
      const payload = {
        sub: credential.id,
        id: credential.credentialableId,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
