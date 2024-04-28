import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { WorkService } from './work.service';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { WorkDTO } from './dto';

@Controller('work')
export class WorkController {
    constructor(private readonly workService: WorkService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/createWork')
    createWork(@Body() workDto: WorkDTO, @Req() request) {
        const token = request.headers['authorization'].slice(7)
        return this.workService.createWork(token, workDto.work)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/get-all-users')
    getAllUsers(@Req() request) {
        const token = request.headers['authorization'].slice(7)
        return this.workService.getAllUsers(token)
    }

}
