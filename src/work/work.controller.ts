import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { WorkService } from './work.service';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { UpdateWorkerOperator, WorkDTO } from './dto';

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

    @UseGuards(JwtAuthGuard)
    @Post('remove-worker')
    removeWorker(@Req() request, @Body() dto: {email: string}) {
        const token = request.headers['authorization'].slice(7)
        return this.workService.removeWorker(token, dto.email)
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-workers')
    getWorkers(@Req() request) {
        const token = request.headers['authorization'].slice(7)
        return this.workService.getWorkers(token)
    }

    @UseGuards(JwtAuthGuard)
    @Post('update-workers-operator')
    updateWorkersOperator(@Req() request, @Body() dto: UpdateWorkerOperator[]) {
        const token = request.headers['authorization'].slice(7)
        return this.workService.updateWorkersOperator(token, dto)
    }
}
