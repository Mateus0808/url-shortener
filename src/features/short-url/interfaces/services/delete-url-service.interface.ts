export interface IDeleteUrlService {
  execute: (id: string, userId: string) => Promise<void>;
}

export const IDeleteUrlServiceToken = 'IDeleteUrlServiceToken';
