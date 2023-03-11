import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './helpers/database/database.module';
import { UsersModule } from './users/users.module';
import { ChatGateway } from './gateways/chat.gateway';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
