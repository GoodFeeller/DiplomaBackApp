import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Work } from './models/work';
import { TokenService } from 'src/token/token.service';
import { AppErrors } from 'src/common/errors';
import { User } from 'src/sign/models/user.model';


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
        return this.userRepository.findAll( {
            where: {
                workId: null,
                confirmed: true
            },
            attributes: {
                exclude: ['password', 'createdAt', 'updatedAt', 'id', 'confirmed', 'confirmKey', 'work', 'workId', 'profession']
            }
        })
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

}