import { Module } from '@nestjs/common';
import { PhoneInfoController } from './phone-info.controller';
import { jwtStrategy } from 'src/strategy';
import { PhoneInfoService } from './phone-info.service';
import { TokenModule } from 'src/token/token.module';
import { HealthInfo } from './models/healthInfo.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([HealthInfo]), TokenModule],
  controllers: [PhoneInfoController],
  providers: [jwtStrategy, PhoneInfoService]
})
export class PhoneInfoModule {}
