import {
    Expose,
    plainToInstance,
    Type,
} from 'class-transformer'
import {
    Column,
    Entity,
    OneToMany,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    EmployeeEEGroup,
    EEGroupRole,
} from './'

/**
 * 员工组
 */
@Entity({
    name: 'eegroups',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class EEGroup extends IBase<EEGroup> {

    @Expose()
    @Type(() => EmployeeEEGroup)
    @OneToMany(type => EmployeeEEGroup, employeeEEGroup => employeeEEGroup.eegroup,
        { createForeignKeyConstraints: false, nullable: true })
    employeeEEGroups?: EmployeeEEGroup[]

    @Expose()
    @Type(() => EEGroupRole)
    @OneToMany(type => EEGroupRole, role => role.eegroup,
        { createForeignKeyConstraints: false, nullable: true })
    eegroupRole?: EEGroupRole[]

    /**
     * 方便给新员工分配相同角色
     */
    @Expose()
    @Column()
    name: string

    @Expose()
    @Column({ name: 'system_code' })
    systemCode: string

    constructor(role: Partial<EEGroup>) {
        super(role)

        if (role) {
            Object.assign(
                this,
                plainToInstance(EEGroup, role, {
                    excludeExtraneousValues: true
                })
            )
        }
    }

}
