import { Inject, Injectable } from "@nestjs/common";
import { ISignInService, UserSignInParams, UserSignInResponse } from "../interfaces/sign-in-service.interface";
import { IGetUserByParamService, IGetUserByParamServiceToken } from "../../user/interfaces/services/get-user-by-param.interface";
import { IHashComparer, IHashComparerToken } from "../../user/interfaces/hasher/hasher.interface";
import { UnauthorizedError } from "../../../common/errors/unauthorized-error/unauthorized-error";
import { IJwtGenerateTokens, IJwtGenerateTokensToken } from "../interfaces/jwt/jwt.interface";

@Injectable()
export class SignInService implements ISignInService {
  constructor(
    @Inject(IGetUserByParamServiceToken)
    private readonly userService: IGetUserByParamService,

    @Inject(IHashComparerToken)
    private readonly argon: IHashComparer,

    @Inject(IJwtGenerateTokensToken)
    private readonly jwtService: IJwtGenerateTokens,
  ) {}

  async signIn(signInDto: UserSignInParams): Promise<UserSignInResponse> {
    const { email, password } = signInDto;

    const user = await this.userService.execute({ email }, ['password']);

    const passwordMatch = await this.argon.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedError('Email ou senha incorreta');

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    const tokens = await this.jwtService.generateTokens(payload);

    return {
      token: tokens.token
    };
  }
}