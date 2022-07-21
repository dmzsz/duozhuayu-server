import {
    Expose,
    plainToInstance,
    Type,
} from 'class-transformer'
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    DataPrivilege,
    Permission,
    Role,
} from './'

/**
 * 角色-权限关联
 */
@Entity({
    name: 'roles_pressions',
    orderBy: {
        createdAt: 'ASC'
    }
})
@Index("IDX_roles_pressions_role_id_permission_id", ["role", "permission"])
export class RolePermission extends IBase<RolePermission> {

    @Expose()
    @Type(() => Role)
    @ManyToOne(type => Role, role => role.rolePermissions,
        { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'role_id' })
    role: Role

    @Expose()
    @Type(() => Permission)
    @ManyToOne(type => Permission, permission => permission.rolePermissions,
        { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'permission_id' })
    permission: Permission

    @Expose()
    @Column({ name: 'system_code' })
    systemCode: string

    constructor(rolePermission: Partial<RolePermission>) {
        super(rolePermission)

        if (rolePermission) {
            Object.assign(
                this,
                plainToInstance(RolePermission, rolePermission, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}
