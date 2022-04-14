import { Entity, Column, OneToMany, PrimaryColumn, ManyToMany } from 'typeorm'
import { Exclude, Expose, plainToInstance, Type } from 'class-transformer'
import { Product } from './product.entity'
import { IBase } from './interface/base.interface'
import { User } from './user.entity'

@Entity({
    name: 'roles',
    orderBy: {
        createdAt: 'ASC'
    }
})
export class Role extends IBase<Role> {

    @Expose()
    @Type(() => User)
    @ManyToMany(
        type => User,
        user => user.roles,
        { createForeignKeyConstraints: false })
    users: User[]

    @Expose()
    @Column()
    name: string

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
