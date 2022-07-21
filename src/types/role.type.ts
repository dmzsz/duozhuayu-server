
import { Entity, Column, OneToMany, PrimaryColumn, ManyToMany } from 'typeorm'
import { Exclude, Expose, plainToInstance, Type } from 'class-transformer'
import { Field, ObjectType } from '@nestjs/graphql'
import { IBase } from '@/types/interface/base.interface'
import { Customer } from './customer.type'
import { RoleOptions } from '@/shared/enums'

@ObjectType({
    implements: () => [IBase],
})
export class Role extends IBase<Role> {
    @Expose()
    @Type(() => Customer)
    @Field(() => [Customer])
    customers: Customer[]

    @Expose()
    @Field({defaultValue: RoleOptions.USER})
    name: RoleOptions

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