import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HealthInfo } from './models/healthInfo.module';
import { getNewHealthInfoDTO } from './dto';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class PhoneInfoService {

    constructor(@InjectModel(HealthInfo) private readonly healthInfoRepository: typeof HealthInfo,
    private readonly tokenService: TokenService) {}

    async saveNewHealthInfo(dto: getNewHealthInfoDTO, token: string): Promise<string> {
        const decodedToken = await this.tokenService.decodeJwtToken(token)
        if (decodedToken.user != dto.username) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        await this.healthInfoRepository.create({
            username: dto.username,
            pulse: JSON.stringify(dto.pulse),
            saturation: JSON.stringify(dto.saturation),
            temperature: JSON.stringify(dto.temperature)
        })
        return 'Info was saved successful'
    }
}
