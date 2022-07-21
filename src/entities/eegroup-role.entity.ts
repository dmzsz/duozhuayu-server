import {
    Exclude,
    Expose,
    plainToInstance,
    Type
} from 'class-transformer'
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    Tree,
    TreeChildren,
    TreeParent,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    DataPrivilege,
    EEGroup,
    Employee,
    Permission,
    Role,
} from './'

/**
 * 员工组-角色关联
 */
@Entity({
    name: 'eegroups_roles',
    orderBy: {
        createdAt: 'ASC'
    }
})
@Index("IDX_eegroups_roles_eegroup_id_role_id", ['eegroup', 'role'])
export class EEGroupRole extends IBase<EEGroupRole> {

    @Expose()
    @Type(() => EEGroup)
    @ManyToOne(type => EEGroup, employee => employee.eegroupRole,
        { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'eegroup_id' })
    eegroup: EEGroup

    @Expose()
    @Type(() => Role)
    @ManyToOne(type => Role, role => role.eegroupRoles,
        { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'role_id' })
    role: Role

    @Expose()
    @Column()
    name: string

    @Expose()
    @Type(() => Permission)
    @ManyToOne(type => Permission, permission => permission.eegroupPermisions,
        { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'permission_id' })
    permission: Permission

    @Expose()
    @Type(() => DataPrivilege)
    @ManyToOne(type => DataPrivilege, dataPrivilege => dataPrivilege.eegroupPrivileges,
        { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'data_privilege_id' })
    dataPrivilege: DataPrivilege

    constructor(eegroupRole: Partial<EEGroupRole>) {
        super(eegroupRole)

        if (eegroupRole) {
            Object.assign(
                this,
                plainToInstance(EEGroupRole, eegroupRole, {
                    excludeExtraneousValues: true
                })
            )
        }
    }

}
