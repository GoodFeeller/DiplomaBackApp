import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './models/message';
import { User } from 'src/sign/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User]), SequelizeModule.forFeature([Message])],
  providers: [MessagesService],
  controllers: [MessagesController]
})
export class MessagesModule {}
