import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  IGetUserByParamService,
  IGetUserByParamServiceToken,
} from 'src/features/user/interfaces/services/get-user-by-param.interface';

type JwtPayload = {
  id: string;
  name: string;
  email: string;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(IGetUserByParamServiceToken)
    private readonly userService: IGetUserByParamService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET ?? '',
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return { id: payload.id, email: payload.email, name: payload.name };
  }
}
