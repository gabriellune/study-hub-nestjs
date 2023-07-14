import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../../modules/users/services/UsersService';
import { compareHash } from '../../../utils/BCrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(personalIdentifier: string, password: string) {
    const user = await this.usersService.getByPersonalIdentifier(
      personalIdentifier,
    );
    if (user) {
      if (!compareHash(password, user.password)) {
        throw new UnauthorizedException();
      }

      const payload = { sub: user.id };

      return {
        accessToken: `Bearer ${await this.jwtService.signAsync(payload)}`,
      };
    }
  }
}
