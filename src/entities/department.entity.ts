import {
    Expose,
    plainToInstance,
    Type,
} from 'class-transformer'
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    Tree,
    TreeChildren,
    TreeParent,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    Employee,
    Position,
} from './'

/**
 * 部门
 */
@Entity({
    name: 'departments',
    orderBy: {
        createdAt: 'ASC'
    }
})
@Tree("closure-table")
export class Department extends IBase<Department> {

    @Expose()
    @Type(() => Position)
    @OneToMany(() => Position, position => position.department,
        { createForeignKeyConstraints: false, nullable: true })
    positions?: Position[]

    @Expose()
    @Type(() => Employee)
    @OneToMany(() => Employee, employee => employee.department,
        { createForeignKeyConstraints: false, nullable: true })
    employees?: Employee[]

    /**
     * 部门名称
     */
    @Expose()
    @Column()
    name: string

    @TreeChildren()
    children: Department[]

    @TreeParent()
    @JoinColumn({ name: 'parent_id' })
    parent: Department

    constructor(department?: Partial<Department>) {
        super(department)

        if (department) {
            Object.assign(
                this,
                plainToInstance(Department, department, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}