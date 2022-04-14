import { Field, ObjectType } from '@nestjs/graphql'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { Product } from './product.type'
import { IBase } from './interface/base.interface'

@ObjectType({
    implements: () => [IBase],
})
export class Tag extends IBase<Tag> {
    @Expose()
    @Type(() => Product)
    @Field(() => [Product])
    product: Product[]

    @Expose()
    @Field()
    name: string

    /**
     * 主题颜色
     */
    @Expose()
    @Field()
    maskColor: string
    /**
     * 描述
     */
    @Expose()
    @Field()
    description: string

    constructor(tag: Partial<Tag>) {
        super(tag)

        if (tag) {
            Object.assign(
                this,
                plainToInstance(Tag, tag, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}