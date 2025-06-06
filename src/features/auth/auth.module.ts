import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ISignInServiceToken } from './interfaces/sign-in-service.interface';
import { SignInService } from './services/sign-in.service';
import { JwtAdapterModule } from './adapters/jwt-adapter.module';
import { AuthController } from './auth.controller';
import { HasherModule } from '../user/adapters/argon-adapter.module';

@Module({
  imports: [UserModule, JwtAdapterModule, HasherModule],
  controllers: [AuthController],
  providers: [
    {
      provide: ISignInServiceToken,
      useClass: SignInService,
    }
  ],
  exports: []
})
export class AuthModule {}
