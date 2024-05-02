import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { FilesService } from './files.service';
import { FormDataRequest } from 'nestjs-form-data';
import { ImageDto } from './dto';
import { Response } from 'express';

@Controller('files')
export class FilesController {

    constructor(private readonly filesService: FilesService) {}

    @UseGuards(JwtAuthGuard)
    @Post('upload-image')
    @FormDataRequest()
    uploadImage(@Body() imageDto: ImageDto, @Req() request: Request) {
        const token = request.headers['authorization'].slice(7)
        return this.filesService.saveImage(imageDto.image, token)
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-image')
    async sendImage(@Req() request: Request, @Res() res: Response) {
        const token = request.headers['authorization'].slice(7)
        return res.sendFile(await this.filesService.getFile(token))
    }

    @UseGuards(JwtAuthGuard)
    @Post('update-work-image')
    @FormDataRequest()
    uploadWorkImage(@Body() imageDto: ImageDto, @Req() request: Request) {
        const token = request.headers['authorization'].slice(7)
        return this.filesService.saveWorkImage(imageDto.image, token)
    }

    @Post('get-work-image')
    async sendWorkImage(@Body() dto: {workId: number}, @Res() res: Response) {
        return res.sendFile(await this.filesService.getWorkFile(dto.workId))
    }

    @Post('get-user-image')
    async getUserImage(@Body() dto: { email: string}, @Res() res: Response) {
        return res.sendFile(await this.filesService.getUserImage(dto.email))
    }

}
