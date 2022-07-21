import {
    Expose,
    plainToInstance,
    Type
} from 'class-transformer'
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
} from 'typeorm'

import { IBase } from './interface/base.interface'
import {
    Role,
    Employee,
    Organisation,
    DataPrivilege,
} from './'

/**
 * 组织-角色关联
 */
@Entity({
    name: 'organisations_roles',
    orderBy: {
        createdAt: 'ASC'
    }
})
@Index("IDX_organisations_roles_organisation_id_role_id", ['organisation', 'role'])
export class OrganisationRole extends IBase<OrganisationRole> {

    @Expose()
    @Type(() => Organisation)
    @ManyToOne(() => Organisation, organisation => organisation.employees,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'organisation_id' })
    organisation?: Organisation

    @Expose()
    @Type(() => Role)
    @ManyToOne(() => Role, role => role.organisationRoles,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'role_id' })
    role?: Role

    @Expose()
    @Type(() => DataPrivilege)
    @ManyToOne(() => DataPrivilege, dataPermission => dataPermission.organisationPermisions,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'permission_id' })
    dataPermission: DataPrivilege

    @Expose()
    @Column()
    name: string

    @Expose()
    @Column({ name: 'system_code' })
    systemCode: string

    /**
     * 
     * @param organisation 
     */
    constructor(organisation?: Partial<OrganisationRole>) {
        super(organisation)

        if (organisation) {
            Object.assign(
                this,
                plainToInstance(OrganisationRole, organisation, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}