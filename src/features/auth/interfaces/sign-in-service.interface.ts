import { SignInDto } from '../dto/sign-in.dto';

export interface UserSignInResponse {
  token: string;
}

export interface UserSignInParams extends SignInDto {}

export interface ISignInService {
  signIn(signInDto: UserSignInParams): Promise<UserSignInResponse>;
}

export const ISignInServiceToken = 'ISignInServiceToken';
