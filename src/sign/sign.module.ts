import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { SignController } from './sign.controller';
import { SignService } from './sign.service';
import { TokenModule } from 'src/token/token.module';
import { jwtStrategy } from 'src/strategy';


@Module({
    imports: [SequelizeModule.forFeature([User]), TokenModule],
    controllers: [SignController],
    providers: [SignService, jwtStrategy]
})
export class SignModule {}
