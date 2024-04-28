import { IsDateString, IsString } from 'class-validator'

export class CreateUserDTO {
    
    @IsString()
    name: string

    @IsString()
    surname: string

    @IsString()
    patronymic: string

    @IsString()
    email: string

    @IsString()
    password: string

    @IsDateString()
    dateOfBirth: Date

    @IsString()
    gender: 'Мужской' | 'Женский'

    @IsString()
    role: "admin" | "operator" | "user"
    
}

export class EnterUserDTO {

    @IsString()
    email: string

    @IsString()
    password: string
}

export class AuthUserResponse {

    @IsString()
    token: string

}

export class ResetPasRequest {

    @IsString()
    email: string

    @IsString()
    code: string

    @IsString()
    newpas: string
}

export class UpdateUserByUserRequest {

    @IsString()
    name: string

    @IsString()
    surname: string

    @IsString()
    patronymic: string

    @IsString()
    password: string

    @IsDateString()
    dateOfBirth: Date

    @IsString()
    gender: 'Мужской' | 'Женский'
}

export class UpdateImgRequest {
    @IsString()
    image: string
}