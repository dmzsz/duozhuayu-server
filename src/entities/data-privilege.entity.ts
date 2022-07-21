import {
    Expose,
    plainToInstance,
    Type,
} from 'class-transformer'
import {
    Column,
    Entity,
    OneToMany,
    Tree,
    TreeChildren,
    TreeParent,
} from 'typeorm'

import { PermissionAction, } from '@/shared/enums'
import { IBase } from './interface/base.interface'
import {
    PositionRole,
    EEGroupRole,
    OrganisationRole,
    RolePermission,
} from './'

/**
 * 数据权限
 * 同一个主体的条件 or,不同主体间 and
 * 如 一个用户的组织配置了 orders的两条约束记录 他们的关系是or关系,
 * 如果这个用户又在职位上配置了orders的约束记录 组织和职位的关系是and关系
 */
@Entity({
    name: 'data_privileges',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class DataPrivilege extends IBase<DataPrivilege> {

    @Expose()
    @Type(() => OrganisationRole)
    @OneToMany(() => OrganisationRole, organisationRole => organisationRole.role,
        { createForeignKeyConstraints: false, nullable: true })
    organisationPermisions?: OrganisationRole[]

    @Expose()
    @Type(() => PositionRole)
    @OneToMany(() => PositionRole, positionRole => positionRole.dataPrivilege,
        { createForeignKeyConstraints: false, nullable: true })
    positionPrivileges?: PositionRole[]

    @Expose()
    @Type(() => EEGroupRole)
    @OneToMany(() => EEGroupRole, eegroupRole => eegroupRole.dataPrivilege,
        { createForeignKeyConstraints: false, nullable: true })
    eegroupPrivileges?: EEGroupRole[]

    @Expose()
    @Column()
    name: string

    @Expose()
    @Column({ name: 'table_name' })
    tableName: string

    /**
     * {currentCustomerId} 当前用户
     * {currentEmployeeId} 当前员工
     * {currentRoleId} 当前角色
     * {currentOrganisationId} 当前组织
     * {currentPositionId} 当前职位
     * {currentSupplierId} 当前供应商
     * groups: 代表括号
     * op: 代表操作和运算符 值有 
     *    算术运算符: +, -, *, /, %
     *    比较运算符: =, !=, <>, >, <, >=, <=, !<, !>
     *    逻辑运算符: ALL, AND, ANY, BETWEEN, IN, LIKE, NOT, OR, IS NULL,UNIQUE
     * rules: 代表完整条件
     *  {"groups":[{
     *      "rules":[
     *          {"field": "employee_id", "op": "=", "value": "{currentEmployeeId}"},
     *          {"field": "organisation_id", "op": "=", "value": "{currentOrganisationId}"}],
     *       "op":"AND"}]
     *   }
     * 等价于 (employee_id={currentEmployeeId} AND organisation_id={currentOrganisationId})
     */
    @Expose()
    @Column({ type: 'json' })
    whereRule: Object

    /**
     * customers表
     * {
     *  "id": PermissionAction.READ,
     *  "phone": PermissionAction.INVISIBLE,
     * }
     */
    @Expose()
    @Column({ type: 'json', name: 'field_action' })
    fieldAction: Object

    @Expose()
    @Column({ nullable: true, name: 'system_code' })
    systemCode?: string

    constructor(dataPrivilege: Partial<DataPrivilege>) {
        super(dataPrivilege)

        if (dataPrivilege) {
            Object.assign(
                this,
                plainToInstance(DataPrivilege, dataPrivilege, {
                    excludeExtraneousValues: true
                })
            )
        }
    }

}
