import { Column, Model, Table } from "sequelize-typescript";

@Table
export class User extends Model {

    @Column
    name: string

    @Column
    surname: string

    @Column
    patronymic: string

    @Column
    password: string

    @Column
    email: string

    @Column
    role: string

    @Column
    gender: string

    @Column
    dateOfBirth: Date

    @Column
    work: string | null

    @Column
    workId: number | null

    @Column
    profession: string | null

    @Column
    confirmed: boolean

    @Column
    confirmKey: string

    @Column
    image: string
}
