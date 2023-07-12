import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/UsersService';
import { User } from '../models/entities/User';
import { ReqResUser } from '../models/interfaces/ReqResUser';
import { CreateUserDTO } from '../models/dto/CreateUserDTO';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  async create(@Body() payload: CreateUserDTO): Promise<void> {
    return this.service.create(payload);
  }

  @Post()
  @ApiOperation({ summary: 'Create Main Admin User' })
  async createMainAdminUser(@Body() payload: CreateUserDTO): Promise<void> {
    return this.service.createMainAdminUser(payload);
  }

  @Get()
  @ApiOperation({ summary: 'Find All Users' })
  async findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find User by Id' })
  async getById(@Param('id') id: string): Promise<User> {
    return this.service.getById(id);
  }

  @Get('req-res/:id')
  @ApiOperation({ summary: 'Find ReqRes User by Id' })
  async getReqResUserById(@Param('id') id: string): Promise<ReqResUser> {
    return this.service.getReqResUserById(id);
  }

  @Get('req-res/avatar/:id')
  @ApiOperation({ summary: 'Get User Avatar by Id' })
  async getReqResAvatarUserById(@Param('id') id: string): Promise<ReqResUser> {
    return this.service.getReqResAvatarUserById(id);
  }
}
