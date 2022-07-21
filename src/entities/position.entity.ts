import {
    Expose,
    plainToInstance, Type
} from 'class-transformer'
import {
    Entity,
    ManyToOne,
    JoinColumn,
    OneToMany,
    Column,
    Index,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    Department,
    Employee,
    Organisation,
    PositionRole,
} from './'

/**
 * 职位
 */
@Entity({
    name: 'positions',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Position extends IBase<Position> {

    @Expose()
    @Type(() => Organisation)
    @Index('IDX_positions_organisation_id')
    @ManyToOne(() => Organisation, organisation => organisation.employees,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'organisation_id' })
    organisation?: Organisation

    @Expose()
    @Type(() => Department)
    @Index('IDX_positions_dept_id')
    @ManyToOne(() => Department, department => department.positions,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'dept_id' })
    department?: Department

    @Expose()
    @Type(() => Employee)
    @OneToMany(() => Employee, employee => employee.position,
        { nullable: true })
    employees?: Employee[]

    @Expose()
    @Type(() => PositionRole)
    @OneToMany(() => PositionRole, positionRole => positionRole.position,
        { nullable: true })
    positionRoles?: PositionRole[]

    @Expose()
    @Type(() => Position)
    @Index('IDX_positions_parent_id')
    @ManyToOne(() => Position, position => position.children,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'parent_id' })
    parent?: Position

    @Expose()
    @Type(() => Position)
    @OneToMany(() => Position, position => position.parent,
        { createForeignKeyConstraints: false, nullable: true })
    children?: Position[]

    @Expose()
    @Column()
    name: string

    @Expose()
    @Column()
    code: string

    /**
     * @param position 
     */
    constructor(position?: Partial<Position>) {
        super(position)

        if (position) {
            Object.assign(
                this,
                plainToInstance(Position, position, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}