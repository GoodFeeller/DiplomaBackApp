import { IsArray, IsString } from "class-validator";

export class getNewHealthInfoDTO {

    @IsString()
    username: string

    @IsArray()
    pulse: number[]

    @IsArray()
    temperature: number[]

    @IsArray()
    saturation: number[]
}