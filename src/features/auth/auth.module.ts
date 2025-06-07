import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ISignInServiceToken } from './interfaces/sign-in-service.interface';
import { SignInService } from './services/sign-in.service';
import { JwtAdapterModule } from './adapters/jwt-adapter.module';
import { AuthController } from './auth.controller';
import { HasherModule } from '../user/adapters/argon-adapter.module';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
  imports: [
    UserModule, 
    JwtAdapterModule, 
    HasherModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: ISignInServiceToken,
      useClass: SignInService,
    },
    AccessTokenStrategy
  ],
  exports: []
})
export class AuthModule {}
