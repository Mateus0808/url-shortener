import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ICreateUserService,
  ICreateUserServiceToken,
} from './interfaces/services/create-user-service.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    @Inject(ICreateUserServiceToken)
    private readonly createUserService: ICreateUserService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.createUserService.createUser(createUserDto);
  }
}
