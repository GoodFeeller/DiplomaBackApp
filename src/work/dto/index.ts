import { IsString } from "class-validator"

export class WorkDTO {
    @IsString()
    work: string
}
