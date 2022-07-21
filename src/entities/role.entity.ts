import {
    Expose,
    plainToInstance,
    Type
} from 'class-transformer'
import {
    Entity,
    Column,
    OneToMany,
    Tree,
    TreeParent,
    TreeChildren
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    PositionRole,
    EEGroupRole,
    OrganisationRole,
    RolePermission,
} from './'

@Entity({
    name: 'roles',
    orderBy: {
        createdAt: 'ASC'
    }
})
@Tree('closure-table')
export class Role extends IBase<Role> {

    @Expose()
    @Type(() => OrganisationRole)
    @OneToMany(() => OrganisationRole, organisationRole => organisationRole.role,
        { createForeignKeyConstraints: false, nullable: true })
    organisationRoles?: OrganisationRole[]

    @Expose()
    @Type(() => PositionRole)
    @OneToMany(() => PositionRole, positionRole => positionRole.role,
        { createForeignKeyConstraints: false, nullable: true })
    positionRoles?: PositionRole[]

    @Expose()
    @Type(() => EEGroupRole)
    @OneToMany(() => EEGroupRole, eegroupRoles => eegroupRoles.role,
        { createForeignKeyConstraints: false, nullable: true })
    eegroupRoles?: EEGroupRole[]

    @Expose()
    @Type(() => RolePermission)
    @OneToMany(() => RolePermission, rolePermission => rolePermission.role,
        { createForeignKeyConstraints: false, nullable: true })
    rolePermissions: RolePermission[]

    @Expose()
    @Type(() => Role)
    @TreeParent()
    parent: Role

    @Expose()
    @Type(() => Role)
    @TreeChildren()
    children: Role[]

    @Expose()
    @Column()
    name: string

    @Expose()
    @Column({ name: 'system_code' })
    systemCode: string

    constructor(role: Partial<Role>) {
        super(role)

        if (role) {
            Object.assign(
                this,
                plainToInstance(Role, role, {
                    excludeExtraneousValues: true
                })
            )
        }
    }

}
