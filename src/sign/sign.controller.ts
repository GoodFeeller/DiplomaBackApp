import { Body, Controller, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDTO, EnterUserDTO, ResetPasRequest, UpdateImgRequest, UpdateUserByUserRequest } from './dto';
import { SignService } from './sign.service';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { Response } from 'express';

@Controller('sign')
export class SignController {
    constructor(private readonly signService: SignService) {}

    @Post('register')
    createUsers(@Body() dto: CreateUserDTO) {
        return this.signService.createUser(dto)
    }

    @Post('login')
    enterUsers(@Body() dto: EnterUserDTO) {
        return this.signService.enterUser(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('personalInfo')
    getPersonalInfo(@Req() request: Request) {
        const token = request.headers['authorization'].slice(7)
        return this.signService.getPersonalInfo(token)
    }

    @Post('reset-request-code')
    resetRequestCode(@Body() dto: { email: string }) {
        return this.signService.resetRequestCode(dto.email)
    }

    @Post('reset-send-code')
    resetSendCode(@Body() dto: { email: string, code: string}) {
        return this.signService.resetSendCode(dto.email, dto.code)
    }

    @Post('reset-password')
    resetPassword(@Body() dto: ResetPasRequest) {
        return this.signService.resetPassword(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-workers')
    getWorkers(@Req() request: Request) {
        const token = request.headers['authorization'].slice(7)
        return this.signService.getWorkers(token)
    }

    @UseGuards(JwtAuthGuard)
    @Post('update-user-by-user')
    updateUserByUser(@Req() request: Request, @Body() dto: UpdateUserByUserRequest) {
        const token = request.headers['authorization'].slice(7)
        return this.signService.changeUserInfoByUser(token, dto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('deleteAccount')
    deleteAccount(@Req() request: Request) {
        const token = request.headers['authorization'].slice(7)
        return this.signService.deleteAccount(token)
    }

    @UseGuards(JwtAuthGuard)
    @Post('updateImg')
    uppdateImg(@Req() request: Request, @Body() dto: UpdateImgRequest) {
        console.log('asdasdasdasdasdadadasdasd hui')
        const token = request.headers['authorization'].slice(7)
        return this.signService.updateImage(token, dto.image)
    }

    @Get('confirm_email')
    async confirmEmail(@Query() query: {email: string, key: string}, @Res() response: Response) {
        await this.signService.confirmEmail(query.key, query.email)
        response.sendFile('confirm.html', {root: './src/static'})

    }
}
