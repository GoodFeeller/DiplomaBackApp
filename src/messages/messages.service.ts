import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './models/message';

@Injectable()
export class MessagesService {

    constructor(@InjectModel(Message) private readonly messageRepository: typeof Message) {}

    async sendMessage(work: string, workId: number, email: string) {
        await this.messageRepository.create({
            work: work,
            workId: workId,
            email: email
        })
        return
    }

    async getMessages(email: string) {
        return await this.messageRepository.findAll({
            where: {
                email: email
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id', 'email']
            }
        })
    }
}
