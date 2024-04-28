import { Column, Table, Model } from "sequelize-typescript";

@Table
export class HealthInfo extends Model {
    
    @Column
    username: string

    @Column
    pulse: string

    @Column
    temperature: string

    @Column
    saturation: string

}