import { IBase } from './interface/base.interface'
import { Field, ObjectType } from '@nestjs/graphql'
import {  Expose, plainToInstance, Type } from 'class-transformer'
import { User } from './user.type'
import { OpenCollection } from './open-collection.type'
import { Product } from './product.type'
import { ProductType } from '@/shared/enums'

/**
 * 用户推荐（发表的动态）
 */
@ObjectType({
    implements: () => [IBase],
})
export class UserContribute extends IBase<UserContribute> {
    /**
     * 贡献者 管理员创建的时候可能为空
     */
    @Expose()
    @Type(() => User)
    @Field(type => User)
    contributor: User

    /**
     * 每次推荐一个商品（主要是图书）， 因为要写理由
     */
    @Expose()
    @Type(() => Product)
    @Field(type => Product)
    product: Product

    /**
     * 书单
     */
    @Expose()
    @Type(() => OpenCollection)
    @Field(type => OpenCollection)
    openCollection: OpenCollection

    /**
     * 推荐理由
     */
    @Expose()
    @Field()
    reason: string

    @Expose()
    @Field()
    type: ProductType

    constructor(userContribute: Partial<UserContribute>) {
        super(userContribute)

        if (userContribute) {
            Object.assign(
                this,
                plainToInstance(UserContribute, userContribute, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}