export interface IDeleteUrlRepository {
  delete: (id: string) => Promise<boolean>;
}

export const IDeleteUrlRepositoryToken = 'IDeleteUrlRepositoryToken';
