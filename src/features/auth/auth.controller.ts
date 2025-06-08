import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  ISignInService,
  ISignInServiceToken,
} from './interfaces/sign-in-service.interface';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(ISignInServiceToken)
    private readonly signInService: ISignInService,
  ) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.signInService.signIn(signInDto);
  }
}
