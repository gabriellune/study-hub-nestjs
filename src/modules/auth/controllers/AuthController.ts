import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from '../models/dtos/LoginDTO';
import { AuthService } from '../services/AuthService';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { LoginResponse } from '../models/documentation/LoginResponse';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({
    description: 'Logged successfully!',
    type: LoginResponse,
  })
  @ApiOperation({ summary: 'Login to generate token' })
  login(@Body() payload: LoginDTO): Promise<LoginResponse> {
    return this.authService.login(payload.email, payload.password);
  }
}
