import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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

    @Get('get-cardio')
    @UseGuards(JwtAuthGuard)
    getCardio(@Req() request: Request) {
        //За 12 часов
    }

    @Post('get-cardio')
    @UseGuards(JwtAuthGuard)
    getCardioPost(@Req() request: Request) {
        //За 12 часов
    }

    @Post('get-history')
    @UseGuards(JwtAuthGuard)
    getHistory(@Req() requset: Request) {
        //По интервалу
    }

    @Post('get-history-by-email')
    @UseGuards(JwtAuthGuard)
    getHistoryByEmail(@Req() requset: Request) {
        //По интервалу
    }

    @Get('get-real-time')
    @UseGuards(JwtAuthGuard)
    getRealTime(@Req() request: Request) {

    }

    @Get('get-real-time')
    @UseGuards(JwtAuthGuard)
    postRealTime(@Req() request: Request) {

    }

}
