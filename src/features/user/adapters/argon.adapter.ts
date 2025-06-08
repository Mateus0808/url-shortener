import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { IHashComparer, IHasher } from '../interfaces/hasher/hasher.interface';

@Injectable()
export class ArgonAdapter implements IHashComparer, IHasher {
  async compare(value: string, hashToCompare: string): Promise<boolean> {
    try {
      return await argon.verify(hashToCompare, value);
    } catch (error) {
      return false;
    }
  }

  async hash(value: string): Promise<string> {
    return await argon.hash(value);
  }
}
