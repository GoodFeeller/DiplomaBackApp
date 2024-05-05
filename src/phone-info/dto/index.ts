import { IsArray, IsNumber, IsString } from "class-validator";

export class getNewHealthInfoDTO {

    @IsNumber()
    timestamp: number

    @IsNumber()
    pulse: number

    @IsNumber()
    temperature: number

    @IsNumber()
    saturation: number

    @IsArray()
    cardiogram: number[]
}