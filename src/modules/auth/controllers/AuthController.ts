import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../models/dtos/LoginDTO';
import { AuthService } from '../services/AuthService';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() payload: LoginDTO): Promise<{ accessToken: string }> {
    return this.authService.login(payload.personalIdentifier, payload.password);
  }
}
