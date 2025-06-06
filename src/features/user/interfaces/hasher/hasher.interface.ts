export interface IHasher {
  hash: (value: string) => Promise<string>
}

export interface IHashComparer {
  compare: (value: string, hashToCompare: string) => Promise<boolean>
}

export const IHasherToken = 'IHasherToken'
export const IHashComparerToken = 'IHashComparerToken'