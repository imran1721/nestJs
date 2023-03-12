import { Module, CacheModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersProviders } from './users.provider';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [JwtModule.register({secret: process.env.SECRET, signOptions: {expiresIn: process.env.EXPIRES_IN}}), 
  CacheModule.register()],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders]
})
export class UsersModule {}
