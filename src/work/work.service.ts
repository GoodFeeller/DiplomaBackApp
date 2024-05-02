import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Work } from './models/work';
import { TokenService } from 'src/token/token.service';
import { AppErrors } from 'src/common/errors';
import { User } from 'src/sign/models/user.model';
import { UpdateWorkerOperator } from './dto';


@Injectable()
export class WorkService {
    constructor(@InjectModel(Work) private readonly workRepository: typeof Work,
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly tokenService: TokenService) {}

    private async findUserByEmail (email: string) {
        return this.userRepository.findOne({where: { email: email }})
    }

    private async updateWorkForUser(email: string, workId: number, work: string) {
        return this.userRepository.update( {
            workId: workId,
            work: work,
            
        }, { where: {email: email} })
    }

    private async findAllUsersWithoutWork() {
        const users = await this.userRepository.findAll( {
            where: {
                workId: null,
                confirmed: true,
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'id', 'confirmed', 'confirmKey', 'work', 'workId', 'profession']
            }
        })
        return users.filter( i => i.role != 'admin')
    }

    async createWork(token: string, work: string) {
        const decodedToken = await this.tokenService.decodeJwtToken(token);
        if (decodedToken.role != 'admin') throw new ForbiddenException(AppErrors.ONLY_ADMIN);
        const user = await this.findUserByEmail(decodedToken.email)
        if(!user) throw new BadRequestException(AppErrors.INVALID_EMAIL)
        const workData = await this.workRepository.create({
            work: work
        })
        if(!workData) throw new BadRequestException(AppErrors.UPDATE_ERROR);
        await this.updateWorkForUser(decodedToken.email, workData.dataValues.id, workData.dataValues.work)
        return { workId: workData.dataValues.id, work: workData.dataValues.work }
    }

    async getAllUsers(token: string) {
        const decodedToken = await this.tokenService.decodeJwtToken(token);
        if (decodedToken.role != 'admin') throw new ForbiddenException(AppErrors.ONLY_ADMIN);
        const user = await this.findUserByEmail(decodedToken.email)
        if(!user) throw new BadRequestException(AppErrors.INVALID_EMAIL)
        return await this.findAllUsersWithoutWork()
    }

    async removeWorker(token: string, email: string) {
        const decodedToken = await this.tokenService.decodeJwtToken(token);
        if (decodedToken.role != 'admin') throw new ForbiddenException(AppErrors.ONLY_ADMIN);
        const user = await this.findUserByEmail(decodedToken.email)
        if(!user) throw new BadRequestException(AppErrors.INVALID_EMAIL)
        const deletedUser = await this.findUserByEmail(email)
        if(!deletedUser) throw new BadRequestException(AppErrors.EMAIL_DONT_EXIST)
        if(deletedUser.workId != user.workId) throw new BadRequestException(AppErrors.ANOTHER_WORK)
        return await this.userRepository.update( {
            work: null,
            workId: null,
            operatorEmail: null
        }, {where: {email: email}})
    }

    async getWorkers(token: string) {
        const decodedToken = await this.tokenService.decodeJwtToken(token);
        const user = await this.findUserByEmail(decodedToken.email)
        return await this.userRepository.findAll({
            where: { workId: user.workId },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'id', 'confirmed', 'confirmKey', 'work', 'workId']}
        })
    }

    async updateWorkersOperator(token: string, dto: UpdateWorkerOperator[]) {
        const decodedToken = await this.tokenService.decodeJwtToken(token);
        if (decodedToken.role != 'admin') throw new ForbiddenException(AppErrors.ONLY_ADMIN);
        dto.forEach( async (item) => {
            await this.userRepository.update({
                operatorEmail: item.operator
            }, {where: {email: item.email}})
        })
        return
    }

}