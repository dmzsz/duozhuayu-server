import {
    Expose,
    plainToInstance,
    Type,
} from 'class-transformer'
import {
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    Employee,
    EEGroup,
    Permission,
} from './'

/**
 * 员工-员工组关联
 */
@Entity({
    name: 'employees_eegroups',
    orderBy: {
        createdAt: 'ASC'
    }
})
@Index("IDX_employees_eegroups_employee_id_eegroup_id", ["employee", "eegroup"])
export class EmployeeEEGroup extends IBase<EmployeeEEGroup> {

    @Expose()
    @Type(() => Employee)
    @ManyToOne(type => Employee, employee => employee.employeeEEGroup,
        { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'employee_id' })
    employee: Employee

    @Expose()
    @Type(() => EEGroup)
    @ManyToOne(type => EEGroup, eegroup => eegroup.employeeEEGroups,
        { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'eegroup_id' })
    eegroup: EEGroup

    @Expose()
    @Type(() => Permission)
    @ManyToOne(() => Permission, permission => permission.eegroupPermisions,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'permission_id' })
    permission: Permission

    constructor(role: Partial<EmployeeEEGroup>) {
        super(role)

        if (role) {
            Object.assign(
                this,
                plainToInstance(EmployeeEEGroup, role, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}
