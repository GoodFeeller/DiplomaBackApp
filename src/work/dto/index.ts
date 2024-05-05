import { IsString } from "class-validator"

export class WorkDTO {
    @IsString()
    work: string
}

export class UpdateWorkerOperator {
    @IsString()
    email: string

    operator: string | null
}

export class UpdateProfession {
    @IsString()
    email: string

    @IsString()
    profession: string
}

export class getWorkerByEmailClass {
    
    @IsString()
    email: string
}