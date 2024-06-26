import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Message extends Model {

    @Column
    email: string

    @Column
    workId: number

    @Column
    work: string
    
}
