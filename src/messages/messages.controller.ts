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

    @Post('/cancel-message')
    cancelMessage(@Body() dto: { email: string, workId: number}) {
        return this.messageService.cancelMessage(dto.email, dto.workId)
    }

    @Post('/accept-message')
    acceptMessage(@Body() dto: { email: string, workId: number, work: string}) {
        return this.messageService.acceptMessage(dto.email, dto.workId, dto.work)
    }
}
