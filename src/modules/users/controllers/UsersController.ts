import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMainAdminUser } from '../models/dto/CreateMainAdminUserDTO';
import { CreateUserDTO } from '../models/dto/CreateUserDTO';
import { User } from '../models/entities/User';
import { ReqResUser } from '../models/interfaces/ReqResUser';
import { UsersService } from '../services/UsersService';
import { AuthGuard } from '../../../modules/auth/shared/AuthGuard';
import { ICourse } from '../../../modules/courses/models/interfaces/ICourse';
import { IUser } from '../models/interfaces/IUser';
import { AddCourseDTO } from '../models/dto/AddCourseDTO';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('main-admin')
  @ApiOperation({ summary: 'Create Main Admin User' })
  async createMainAdminUser(
    @Body() payload: CreateMainAdminUser,
  ): Promise<void> {
    return this.service.createMainAdminUser(payload);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create User (Admin or Student)' })
  async create(@Body() payload: CreateUserDTO): Promise<void> {
    return this.service.handleCreateUser(payload);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Find All Users' })
  async findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Find User and Course by User Id' })
  async getCourseAndUserById(
    @Param('id') id: string,
  ): Promise<{ user: IUser; course: ICourse }> {
    return this.service.getCourseAndUserById(id);
  }

  @UseGuards(AuthGuard)
  @Get('req-res/:id')
  @ApiOperation({ summary: 'Find ReqRes User by Id' })
  async getReqResUserById(@Param('id') id: number): Promise<ReqResUser> {
    return this.service.getReqResUser(id);
  }

  @UseGuards(AuthGuard)
  @Get('req-res/avatar/:id')
  @ApiOperation({ summary: 'Get User Avatar by Id' })
  async getReqResAvatarUserById(@Param('id') id: number): Promise<ReqResUser> {
    return this.service.getReqResAvatarUserById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/add-course')
  @ApiOperation({ summary: 'Add Course' })
  async addAttachments(
    @Param('id') id: string,
    @Body() payload: AddCourseDTO,
  ): Promise<string> {
    return this.service.addCourse(id, payload);
  }
}
