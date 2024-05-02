import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './models/message';
import { User } from 'src/sign/models/user.model';
import { where } from 'sequelize';

@Injectable()
export class MessagesService {

    constructor(@InjectModel(Message) private readonly messageRepository: typeof Message,
    @InjectModel(User) private readonly userRepository: typeof User) {}

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

    async cancelMessage(email: string, workId: number) {
        return await this.messageRepository.destroy({
            where: {
                workId: workId,
                email: email
            }
        })
    }

    async acceptMessage(email: string, workId: number, work: string) {
        await this.userRepository.update( {
            workId: workId,
            work: work
        }, {
            where: {
                email: email
            }
        })
        return await this.messageRepository.destroy({
            where: {
                email: email
            }
        })
    }
}
