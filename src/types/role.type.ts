
import { Entity, Column, OneToMany, PrimaryColumn, ManyToMany } from 'typeorm'
import { Exclude, Expose, plainToInstance, Type } from 'class-transformer'
import { Field, ObjectType } from '@nestjs/graphql'
import { IBase } from '@/types/interface/base.interface'
import { User } from './user.type'
import { RoleOptions } from '@/shared/enums'

@ObjectType({
    implements: () => [IBase],
})
export class Role extends IBase<Role> {
    @Expose()
    @Type(() => User)
    @Field(() => [User])
    users: User[]

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