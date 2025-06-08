import { Module } from '@nestjs/common';
import { JwtAdapter } from './jwt.adapter';
import { IJwtGenerateTokensToken } from '../interfaces/jwt/jwt.interface';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    JwtService,
    {
      provide: IJwtGenerateTokensToken,
      useClass: JwtAdapter,
    },
  ],
  exports: [IJwtGenerateTokensToken, JwtService],
})
export class JwtAdapterModule {}
