import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messageService: MessagesService) {}

    @Post('/send-message')
    sendMessage(@Body() dto: { work: string, workId: number, email: string}) {
        return this.messageService.sendMessage(dto.work, dto.workId, dto.email)

    }

    @Post('/get-messages')
    getMessages(@Body() dto: {email: string}) {
        return this.messageService.getMessages(dto.email)
    }
}
