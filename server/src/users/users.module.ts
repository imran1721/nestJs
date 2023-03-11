import { Module, CacheModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersProviders } from './users.provider';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({secret: 'SECRET', signOptions: {expiresIn: '1d'}}), 
  CacheModule.register()],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders]
})
export class UsersModule {}
