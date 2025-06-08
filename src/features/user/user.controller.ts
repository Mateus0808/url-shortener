import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ICreateUserService,
  ICreateUserServiceToken,
} from './interfaces/services/create-user-service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(ICreateUserServiceToken)
    private readonly createUserService: ICreateUserService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.createUserService.createUser(createUserDto);
  }
}
