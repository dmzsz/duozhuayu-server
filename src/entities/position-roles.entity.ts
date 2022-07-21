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
    Position,
    Role,
    Permission,
    DataPrivilege,
} from './'

/**
 * 员工-员工组关联
 */
@Entity({
    name: 'positions_roles',
    orderBy: {
        createdAt: 'ASC'
    }
})
@Index("IDX_positions_roles_position_id_role_id", ["position", "role"])
export class PositionRole extends IBase<PositionRole> {

    @Expose()
    @Type(() => Position)
    @ManyToOne(type => Position, position => position.positionRoles,
        { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'position_id' })
    position: Position

    @Expose()
    @Type(() => Role)
    @ManyToOne(type => Role, role => role.positionRoles,
        { createForeignKeyConstraints: false })
    @JoinColumn({ name: 'role_id' })
    role: Role

    @Expose()
    @Type(() => Permission)
    @ManyToOne(() => Permission, permission => permission.positionPermisions,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'permission_id' })
    permission: Permission

    @Expose()
    @Type(() => DataPrivilege)
    @ManyToOne(() => DataPrivilege, dataPrivilege => dataPrivilege.positionPrivileges,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'data_privilege_id' })
    dataPrivilege: DataPrivilege

    /**
     * 方便给新职位分配相同角色
     */
    @Expose()
    @Column()
    name: string

    @Expose()
    @Column({ name: 'system_code' })
    systemCode: string

    constructor(positionRole: Partial<PositionRole>) {
        super(positionRole)

        if (positionRole) {
            Object.assign(
                this,
                plainToInstance(PositionRole, positionRole, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}
