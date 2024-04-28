import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Work } from './models/work';
import { jwtStrategy } from 'src/strategy';
import { TokenModule } from 'src/token/token.module';
import { User } from 'src/sign/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Work]), SequelizeModule.forFeature([User]), TokenModule],
  controllers: [WorkController],
  providers: [WorkService, jwtStrategy],
})
export class WorkModule {}
