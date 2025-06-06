import { Module } from '@nestjs/common';
import { JwtAdapter } from './jwt.adapter';
import { IJwtGenerateTokensToken } from '../interfaces/jwt/jwt.interface';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    JwtService,
    {
      provide: IJwtGenerateTokensToken,
      useClass: JwtAdapter
    }
  ],
  exports: [IJwtGenerateTokensToken, JwtService]
})
export class JwtAdapterModule {}