export interface JwtPayload {
  id: string;
  name: string;
  email: string;
}

export interface JwtTokensResponse {
  token: string;
}

export interface IJwtGenerateTokens {
  generateTokens: (payload: JwtPayload) => Promise<JwtTokensResponse>;
}

export const IJwtGenerateTokensToken = 'IJwtGenerateTokensToken';
