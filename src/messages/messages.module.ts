import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './models/message';
import { TokenModule } from 'src/token/token.module';
import { jwtStrategy } from 'src/strategy';

@Module({
  imports: [SequelizeModule.forFeature([Message])],
  providers: [MessagesService],
  controllers: [MessagesController]
})
export class MessagesModule {}
