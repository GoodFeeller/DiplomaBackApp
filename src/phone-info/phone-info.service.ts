import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HealthInfo } from './models/healthInfo.module';
import { getNewHealthInfoDTO } from './dto';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class PhoneInfoService {

    constructor(@InjectModel(HealthInfo) private readonly healthInfoRepository: typeof HealthInfo,
    private readonly tokenService: TokenService) {}

    async saveNewHealthInfo(dto: getNewHealthInfoDTO, token: string) {
        const decodedToken = await this.tokenService.decodeJwtToken(token)
        await this.healthInfoRepository.create({
            email: decodedToken.email,
            pulse: dto.pulse,
            saturation: dto.saturation,
            temperature: dto.temperature,
            cardiogram: dto.cardiogram,
            timestamp: dto.timestamp
        })
        return
    }
    
}
