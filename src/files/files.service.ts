import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { existsSync, writeFileSync } from 'fs';
import { MemoryStoredFile } from 'nestjs-form-data';
import path from 'path';
import { AppErrors } from 'src/common/errors';
import { User } from 'src/sign/models/user.model';

import { TokenService } from 'src/token/token.service';

@Injectable()
export class FilesService {

    constructor(private readonly tokenService: TokenService,
        @InjectModel(User) private readonly userRepository: typeof User
    ) {}

    private async findUserByEmail (email: string) {
        return this.userRepository.findOne({where: { email: email }})
    }

    private readonly imagesDir = __dirname.slice(0, -11) + '/images';
    private readonly imagesWorkDir = __dirname.slice(0, -11) + '/work-images';

    async saveImage(file: MemoryStoredFile, token: string) {
        const decodedToken = await this.tokenService.decodeJwtToken(token)
        writeFileSync(`${this.imagesDir}/${decodedToken.email}.png`, file.buffer)
        return
    }

    async getFile(token: string) {
        const decodedToken = await this.tokenService.decodeJwtToken(token)
        const filePath = `${this.imagesDir}/${decodedToken.email}.png`
        if (existsSync(filePath)) {
            return filePath
        } else {
            throw new BadRequestException(AppErrors.NO_IMAGE)
        }
    }

    async getUserImage(email: string) {
        const filePath = `${this.imagesDir}/${email}.png`
        if (existsSync(filePath)) {
            return filePath
        } else {
            throw new BadRequestException(AppErrors.NO_IMAGE)
        }
    }

    async saveWorkImage(file: MemoryStoredFile, token: string) {
        const decodedToken = await this.tokenService.decodeJwtToken(token)
        const user = await this.findUserByEmail(decodedToken.email)
        if(!user) throw new BadRequestException(AppErrors.EMAIL_DONT_EXIST)
        if(decodedToken.role != 'admin') throw new ForbiddenException(AppErrors.ONLY_ADMIN)
        if(!user.workId) throw new BadRequestException(AppErrors.NO_WORK)
        writeFileSync(`${this.imagesWorkDir}/${user.workId}.png`, file.buffer)
        return
    }

    async getWorkFile(workId: number) {
        const filePath = `${this.imagesWorkDir}/${workId}.png`
        if (existsSync(filePath)) {
            return filePath
        } else {
            throw new BadRequestException(AppErrors.NO_IMAGE)
        }
    }

}