import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ISignInService,
  ISignInServiceToken,
} from './interfaces/sign-in-service.interface';
import { SignInDto } from './dto/sign-in.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SignInResponseDto } from './dto/sign-in-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(ISignInServiceToken)
    private readonly signInService: ISignInService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Authenticates a user and returns the JWT token' })
  @ApiResponse({
    status: 201,
    description: 'User authenticated successfully'
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials'  })
  @ApiBody({ type: SignInResponseDto })
  async signIn(@Body() signInDto: SignInDto) {
    return await this.signInService.signIn(signInDto);
  }
}
