import { Module } from '@nestjs/common';
import { IHashComparerToken, IHasherToken } from '../interfaces/hasher/hasher.interface';
import { ArgonAdapter } from './argon.adapter';

@Module({
  providers: [
    {
      provide: IHasherToken,
      useClass: ArgonAdapter
    },
    {
      provide: IHashComparerToken,
      useClass: ArgonAdapter
    }
  ],
  exports: [
    IHasherToken, 
    IHashComparerToken 
  ]
})
export class HasherModule {}