import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IJwtGenerateTokens, JwtPayload, JwtTokensResponse } from '../interfaces/jwt/jwt.interface';

@Injectable()
export class JwtAdapter implements IJwtGenerateTokens {
  private readonly logger = new Logger(JwtAdapter.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async generateTokens(payload: JwtPayload): Promise<JwtTokensResponse> {
    try {
      const accessToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '1h',
      })
  
      return {
        token: accessToken
      }
    } catch (error) {
      this.logger.error('Error generating tokens', error.stack || error.message);
      throw error;
    }
  }
}