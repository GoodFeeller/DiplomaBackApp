import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt'
import { AuthUserResponse, CreateUserDTO, EnterUserDTO, ResetPasRequest, UpdateUserByUserRequest } from './dto';
import { AppErrors } from 'src/common/errors';
import { TokenService } from 'src/token/token.service';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class SignService {

    constructor(@InjectModel(User) private readonly userRepository: typeof User,
    private readonly mailerService: MailerService,
    private readonly tokenService: TokenService) {}

    async hashPassword(password: string) {
        return bcrypt.hash(password, 10)
    }

    async findUserByEmail (email: string) {
        return this.userRepository.findOne({where: { email: email }})
    }

    async updatePass (dto: User) {
        return this.userRepository.update({password: dto.password}, {where: {email: dto.email}})
    }

    async updateUserByUser (dto: UpdateUserByUserRequest, email: string) {
        return this.userRepository.update(
            {
                password: dto.password,
                name: dto.name,
                surname: dto.surname,
                patronymic: dto.patronymic,
                gender: dto.gender,
                dateOfBirth: dto.dateOfBirth
            }, 
            {where: {email: email}})
    }

    async updateConfKey ( key: string, email: string) {
        return this.userRepository.update(
            {
                confirmKey: key
            }, 
            {where: {email: email}})
    }

    async deleteUser(email: string) {
        return this.userRepository.destroy(
            {
                where: {email: email}
            }
        )
    }

    async sendEmail(email: string, key: string) {
        return await this.mailerService.sendMail({
            to: email,
            from: 'vital.link@goodfeeller-test.by',
            subject: "Подтверждение регистрации",
            html: `<!DOCTYPE html> <html lang="en"> <head> 
            <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, 
            initial-scale=1.0"> <title>Подтверждение адреса электронной почты</title> 
            </head> <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;"> 
            <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;"> 
            <tr> <td align="center" bgcolor="#3A5D93" style="padding: 40px 0;"> <span style="color: white;
            font-size: 22pt; font-weight: bold;">VITAL LINK</span> </td> </tr> <tr> <td bgcolor="#ffffff" 
            style="padding: 40px 30px;"> <p>Приветствуем вас!</p> <p>Мы рады приветствовать вас в нашем сообществе!
            Для завершения процесса регистрации и активации вашего аккаунта, пожалуйста, подтвердите ваш адрес электронной
            почты.</p> <p>Чтобы подтвердить вашу почту, просто нажмите на ссылку ниже:</p> <p>
            <a href="http://192.168.218.207:3000/sign/confirm_email?key=${key}&email=${email}" style="display: inline-block; 
            padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">
            Подтвердить адрес</a></p> <p>Если вы не регистрировались на нашем сайте или не запрашивали подтверждение почты, 
            проигнорируйте это сообщение.</p> <p>С уважением,<br>Команда Vital Link</p> </td> </tr> <tr> <td bgcolor="#f8f8f8"
            align="center" style="padding: 20px 0;"> <p style="font-size: 12px; color: #666666;">Это автоматическое сообщение,
            пожалуйста, не отвечайте на него.</p> </td> </tr> </table> </body> </html>`
        })
    }

    async sendCode(email: string, key: string) {
        return await this.mailerService.sendMail({
            to: email,
            from: 'vital.link@goodfeeller-test.by',
            subject: "Сброс пароля",
            html: `<!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Сброс пароля</title>
            </head>
            
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
                <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                    <tr>
                        <td align="center" bgcolor="#3A5D93" style="padding: 40px 0;">
                            <span style="color: white; font-size: 22pt; font-weight: bold;">VITAL LINK</span>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#ffffff" style="padding: 40px 30px;">
                            <p>Здравствуйте!</p>
                            <p>Вы получили это письмо, потому что запросили сброс пароля на сайте Vital Link.</p>
                            <p>Код для сброса пароля:</p> 
                            <p style="display: block; font-weight: bold; font-size: 24pt; background-color: #567DE4; padding: 15px 50px; border-radius: 10px; color: white;">
                            <span>${key}</span></p>
                            <p>Если вы не запрашивали сброс пароля, проигнорируйте это сообщение.</p>
                            <p>С уважением,<br>Команда Vital Link</p>
                        </td>
                    </tr>
                    <tr>
                        <td bgcolor="#f8f8f8" align="center" style="padding: 20px 0;">
                            <p style="font-size: 12px; color: #666666;">Это автоматическое сообщение, пожалуйста, не отвечайте на него.</p>
                        </td>
                    </tr>
                </table>
            </body>
            
            </html>
            `
        })
    }
    
    async findWorkers(workId: number) {
        return await this.userRepository.findAll(
            {
                where: {workId: workId},
                attributes: {exclude: ['updatedAt', 'createdAt', 'work', 'workId', 'password']}
            }
        )
    }

    async createUser(dto: CreateUserDTO): Promise<AuthUserResponse> {
        console.log('Register')
        if( await this.findUserByEmail(dto.email))  throw new BadRequestException(AppErrors.EMAIL_EXIST)
        dto.password = await this.hashPassword(dto.password)
        const confKey = (Math.random() * 1000000).toString().substring(0, 6)
        await this.userRepository.create({
            name: dto.name,
            surname: dto.surname,
            email: dto.email,
            password: dto.password,
            role: dto.role,
            gender: dto.gender,
            patronymic: dto.patronymic,
            dateOfBirth: dto.dateOfBirth,
            work: null,
            workId: null,
            profession: null,
            confirmed: false,
            confirmKey: confKey
        })
        try {
            this.sendEmail(dto.email, confKey)
        }
        catch(err) {
            throw new BadRequestException(AppErrors.INVALID_EMAIL)

        }
        return
    }

    async enterUser(dto: EnterUserDTO): Promise<AuthUserResponse> {
        const existUser = await this.findUserByEmail(dto.email)
        if(!existUser) throw new BadRequestException(AppErrors.WRONG_AUTH)
        if(!await bcrypt.compare(dto.password, existUser.password)) throw new BadRequestException(AppErrors.WRONG_AUTH)
        if(!existUser.confirmed) throw new BadRequestException(AppErrors.UNCONFIRMED)
        const user = await this.publicUser(dto.email)
        const token = await this.tokenService.generateJwtToken({email: dto.email, role: user.role})
        return { token: token}
    }

    async publicUser(email: string) {
        return await this.userRepository.findOne({
            where: {email: email},
            attributes: {exclude: ['password', 'createdAt', 'updatedAt', 'id', 'confirmed', 'confirmKey']}
        }
        )
    } 

    async getPersonalInfo(token: string) {
        const decodedToken = await this.tokenService.decodeJwtToken(token)
        console.log(this.publicUser(decodedToken.email))   

        return this.publicUser(decodedToken.email)
    }

    async resetPassword(dto: ResetPasRequest) {
        const user = await this.findUserByEmail(dto.email)
        if(!user) throw new BadRequestException(AppErrors.EMAIL_DONT_EXIST)
        if(!user.confirmed) throw new BadRequestException(AppErrors.UNCONFIRMED)
        if(user.confirmKey !== dto.code) throw new BadRequestException(AppErrors.WRONG_CODE)
        user.password = await this.hashPassword(dto.newpas)
        if((await this.updatePass(user))[0] == 0) throw new BadRequestException(AppErrors.UPDATE_ERROR)
            const token = await this.tokenService.generateJwtToken({email: user.email, role: user.role})
            return {token: token};
    }

    async getWorkers(token: string) {
        const decodedToken = await this.tokenService.decodeJwtToken(token)
        const user = await this.findUserByEmail(decodedToken.email)
        if(!user.workId) throw new BadRequestException(AppErrors.NO_WORK)
        return await this.findWorkers(user.workId)
    }

    async changeUserInfoByUser(token: string, dto: UpdateUserByUserRequest) {
        const decodedToken = await this.tokenService.decodeJwtToken(token)
        if(dto.password == '') {
            const user = await this.findUserByEmail(decodedToken.email)
            dto.password = user.password
        }
        else {
            dto.password = await this.hashPassword(dto.password)
        }
        if(await this.updateUserByUser(dto, decodedToken.email)[0] == 0) throw new BadRequestException(AppErrors.UPDATE_ERROR)
        return
    }

    async deleteAccount(token: string) {
        const decodedToken = await this.tokenService.decodeJwtToken(token)
        console.log(await this.deleteUser(decodedToken.email))
        return
    }

    async updateImage(token: string, image: string) {
        console.log('update')
        const decodedToken = await this.tokenService.decodeJwtToken(token)
        await this.userRepository.update(
            {image: image},
            {
                where: {email: decodedToken.email}
            }
        )
        return
    }

    async confirmEmail(key: string, email: string) {
        const user = await this.findUserByEmail(email)
        if(!user) throw new BadRequestException(AppErrors.EMAIL_DONT_EXIST)
        if(user.confirmed) throw new BadRequestException(AppErrors.CONFIRMED)
        if(user.confirmKey == key) {
            await this.userRepository.update(
                {confirmed: true},
                { where: {email: email}}
            )
        }
        else throw new BadRequestException(AppErrors.WRONG_CONF_KEY)
        return;
    }

    async resetRequestCode(email: string) {
        const user = await this.findUserByEmail(email)
        if(!user) throw new BadRequestException(AppErrors.EMAIL_DONT_EXIST)
        if(!user.confirmed) throw new BadRequestException(AppErrors.UNCONFIRMED)
        const confKey = (Math.random() * 1000000).toString().substring(0, 6)
        this.sendCode(email, confKey)
        this.updateConfKey(confKey, email)
        return
    }

    async resetSendCode(email: string, key: string) {
        const user = await this.findUserByEmail(email)
        if(!user) throw new BadRequestException(AppErrors.EMAIL_DONT_EXIST)
        if(!user.confirmed) throw new BadRequestException(AppErrors.UNCONFIRMED)
        if(user.confirmKey == key) return { status: true}
        else throw new BadRequestException(AppErrors.WRONG_CODE)
    }
}

