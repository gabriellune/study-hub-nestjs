import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../../modules/auth/shared/AuthGuard';
import { Course } from '../../courses/models/classess/Course';
import { ReqResUser } from '../models/classes/ReqResUser';
import { User } from '../models/classes/User';
import { SuccessMessage } from '../models/documentation/SuccesMessage';
import { UserAndCourse } from '../models/documentation/UserAndCourse';
import { AddCourseDTO } from '../models/dto/AddCourseDTO';
import { CreateMainAdminUser } from '../models/dto/CreateMainAdminUserDTO';
import { CreateUserDTO } from '../models/dto/CreateUserDTO';
import { UsersService } from '../services/UsersService';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post('main-admin')
  @ApiCreatedResponse({
    description: 'Created user!',
    type: SuccessMessage,
  })
  @ApiOperation({ summary: 'Create Main Admin User' })
  async createMainAdminUser(
    @Body() payload: CreateMainAdminUser,
  ): Promise<SuccessMessage> {
    return this.service.createMainAdminUser(payload);
  }

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({
    description: 'Created user!',
    type: SuccessMessage,
  })
  @ApiOperation({ summary: 'Create User (Admin or Student)' })
  async create(@Body() payload: CreateUserDTO): Promise<SuccessMessage> {
    return this.service.handleCreateUser(payload);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({
    description: 'Find All Users!',
    type: User,
  })
  @ApiOperation({ summary: 'Find All Users' })
  async findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOkResponse({
    description: 'Find User!',
    type: UserAndCourse,
  })
  @ApiOperation({ summary: 'Find User and Course by User Id' })
  async getCourseAndUserById(
    @Param('id') id: string,
  ): Promise<{ user: User; course: Course }> {
    return this.service.getCourseAndUserById(id);
  }

  @UseGuards(AuthGuard)
  @Get('req-res/:id')
  @ApiOkResponse({
    description: 'Find ReqRes User!',
    type: ReqResUser,
  })
  @ApiOperation({ summary: 'Find ReqRes User by Id' })
  async getReqResUserById(@Param('id') id: number): Promise<ReqResUser> {
    return this.service.getReqResUser(id);
  }

  @UseGuards(AuthGuard)
  @Get('req-res/avatar/:id')
  @ApiOkResponse({
    description: 'Find ReqRes User!',
    type: ReqResUser,
  })
  @ApiOperation({ summary: 'Get User Avatar by Id' })
  async getReqResAvatarUserById(@Param('id') id: number): Promise<ReqResUser> {
    return this.service.getReqResAvatarUserById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/add-course')
  @ApiCreatedResponse({
    description: 'Course Added!',
    type: String,
  })
  @ApiOperation({ summary: 'Add Course' })
  async addCourse(
    @Param('id') id: string,
    @Body() payload: AddCourseDTO,
  ): Promise<string> {
    return this.service.addCourse(id, payload);
  }
}
