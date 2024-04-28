import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Worker extends Model {

    @Column
    email: string

    @Column
    operatorEmail: string
    
}