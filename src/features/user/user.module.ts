import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './services/create-user.service';
import { ICreateUserServiceToken } from './interfaces/services/create-user-service.interface';
import { UserDatabaseModule } from './repository/user-database.module';
import { HasherModule } from './adapters/argon-adapter.module';
import { IGetUserByParamServiceToken } from './interfaces/services/get-user-by-param.interface';
import { GetUserService } from './services/get-user-by-param.service';

@Module({
  imports: [UserDatabaseModule, HasherModule],
  controllers: [UserController],
  providers: [
    {
      provide: ICreateUserServiceToken,
      useClass: CreateUserService,
    },
    {
      provide: IGetUserByParamServiceToken,
      useClass: GetUserService,
    },
  ],
  exports: [IGetUserByParamServiceToken],
})
export class UserModule {}
