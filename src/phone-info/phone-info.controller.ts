import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { getNewHealthInfoDTO } from './dto';
import { PhoneInfoService } from './phone-info.service';

@Controller('info')
export class PhoneInfoController {

    constructor(private readonly phoneInfoService: PhoneInfoService) {}
    
    @Post('send-pocket')
    @UseGuards(JwtAuthGuard)
    getPocket(@Body() dto: getNewHealthInfoDTO, @Req() request: Request) {
        const token = request.headers['authorization'].slice(7)
        return this.phoneInfoService.saveNewHealthInfo(dto, token)
    }
}
