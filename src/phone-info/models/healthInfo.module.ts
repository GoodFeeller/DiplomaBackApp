import { Column, Table, Model, DataType } from "sequelize-typescript";

@Table
export class HealthInfo extends Model {
    
    @Column
    email: string

    @Column
    timestamp: number

    @Column({type: DataType.DOUBLE})
    pulse: number

    @Column({type: DataType.DOUBLE})
    temperature: number

    @Column({type: DataType.DOUBLE})
    saturation: number

    @Column({type: DataType.ARRAY(DataType.DOUBLE)})
    cardiogram: number[]

}