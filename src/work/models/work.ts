import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Work extends Model {
    
    @Column
    work: string
    
}