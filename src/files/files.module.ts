import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { TokenModule } from 'src/token/token.module';
import { jwtStrategy } from 'src/strategy';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/sign/models/user.model';

@Module({
  imports: [TokenModule, NestjsFormDataModule, SequelizeModule.forFeature([User])],
  controllers: [FilesController],
  providers: [FilesService, jwtStrategy]
})
export class FilesModule {}
