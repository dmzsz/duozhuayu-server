import {
    Expose,
    plainToInstance,
    Type
} from 'class-transformer'
import {
    Column,
    Entity,
    OneToMany,
    Tree,
    TreeChildren,
    TreeParent,
} from 'typeorm'

import { PermissionAction } from '@/shared/enums'
import { IBase } from './interface/base.interface'
import {
    EEGroupRole,
    Organisation,
    OrganisationRole,
    PositionRole,
    RolePermission,
} from './'

@Entity({
    name: 'permissions',
    orderBy: {
        createdAt: 'ASC'
    }
})
@Tree('closure-table')
export class Permission extends IBase<Permission> {

    @Expose()
    @Type(() => PositionRole)
    @OneToMany(() => PositionRole, positionRole => positionRole.role,
        { createForeignKeyConstraints: false, nullable: true })
    positionRoles?: PositionRole[]

    @Expose()
    @Type(() => OrganisationRole)
    @OneToMany(() => OrganisationRole, organisationRole => organisationRole.role,
        { createForeignKeyConstraints: false, nullable: true })
    organisationPermisions?: OrganisationRole[]

    @Expose()
    @Type(() => RolePermission)
    @OneToMany(() => RolePermission, rolePermission => rolePermission.permission,
        { createForeignKeyConstraints: false, nullable: true })
    rolePermissions?: RolePermission[]

    @Expose()
    @Type(() => PositionRole)
    @OneToMany(() => PositionRole, rolePermission => rolePermission.permission,
        { createForeignKeyConstraints: false, nullable: true })
    positionPermisions?: PositionRole[]

    @Expose()
    @Type(() => EEGroupRole)
    @OneToMany(() => EEGroupRole, rolePermission => rolePermission.permission,
        { createForeignKeyConstraints: false, nullable: true })
    eegroupPermisions?: EEGroupRole[]

    @Expose()
    @Type(() => Permission)
    @TreeParent()
    parent: Permission

    @Expose()
    @Type(() => Permission)
    @TreeChildren()
    children: Permission[]

    @Expose()
    @Column()
    name: string

    @Expose()
    @Column({ nullable: true, name: 'system_code' })
    systemCode?: string

    @Expose()
    @Column({ nullable: true, name: 'menu_path' })
    menuPath?: string

    @Expose()
    @Column({ nullable: true })
    source?: string

    /**
     * {
     *  field: PermissionAction.INVISIBLE
     * }
     */
    @Expose()
    @Column({ type: 'json', nullable: true, name: 'field_action' })
    fieldAction?: Object

    @Expose()
    @Column({ type: 'enum', enum: PermissionAction, nullable: true })
    action?: PermissionAction

    constructor(role: Partial<Permission>) {
        super(role)

        if (role) {
            Object.assign(
                this,
                plainToInstance(Permission, role, {
                    excludeExtraneousValues: true
                })
            )
        }
    }

}
