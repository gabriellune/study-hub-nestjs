import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/UsersService';
import { JwtService } from '@nestjs/jwt';

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

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id };

    return {
      accessToken: `Bearer ${await this.jwtService.signAsync(payload)}`,
    };
  }
}
