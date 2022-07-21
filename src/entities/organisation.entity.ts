import {
    Expose,
    plainToInstance,
    Type
} from 'class-transformer'
import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    Index,
    OneToMany,
} from 'typeorm'

import { OrganisationType } from '@/shared/enums'
import { IBase } from './interface/base.interface'
import {
    Department,
    Employee,
    OrganisationRole,
    Position,
} from './'

/**
 * 组织
 */
@Entity({
    name: 'organisations',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Organisation extends IBase<Organisation> {

    @Expose()
    @Type(() => Department)
    @OneToMany(() => Department, department => department.employees,
        { createForeignKeyConstraints: false, nullable: true })
    departments?: Department[]

    @Expose()
    @Type(() => Position)
    @OneToMany(() => Position, position => position.organisation,
        { createForeignKeyConstraints: false, nullable: true })
    positions?: Position[]

    @Expose()
    @Type(() => OrganisationRole)
    @OneToMany(() => OrganisationRole, organisationRole => organisationRole.organisation,
        { createForeignKeyConstraints: false, nullable: true })
    organisationRole?: OrganisationRole[]

    @Expose()
    @Type(() => Employee)
    @OneToMany(() => Employee, empoloyee => empoloyee.organisation,
        { createForeignKeyConstraints: false, nullable: true })
    employees?: Employee[]

    @Expose()
    @Type(() => Organisation)
    @ManyToOne(() => Organisation, organisation => organisation.children,
        { createForeignKeyConstraints: false, nullable: true })
    @JoinColumn({ name: 'parent_id' })
    parent?: Organisation

    @Expose()
    @Type(() => Organisation)
    @OneToMany(() => Organisation, organisation => organisation.parent,
        { createForeignKeyConstraints: false, nullable: true })
    children?: Organisation[]

    @Expose()
    @Column()
    name: string

    @Expose()
    @Column()
    code: string

    @Expose()
    @Column({ type: 'enum', enum: OrganisationType, default: OrganisationType.BranchOffice })
    type: OrganisationType = OrganisationType.BranchOffice 

    /**
     * 
     * @param organisation 
     */
    constructor(organisation?: Partial<Organisation>) {
        super(organisation)

        if (organisation) {
            Object.assign(
                this,
                plainToInstance(Organisation, organisation, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}