import { IBase } from './interface/base.interface'
import { Field, ObjectType } from '@nestjs/graphql'
import {  Expose, plainToInstance, Type } from 'class-transformer'
import { Customer } from './customer.type'
import { OpenCollection } from './open-collection.type'
import { Product } from './product.type'
import { ProductType } from '@/shared/enums'

/**
 * 用户推荐（发表的动态）
 */
@ObjectType({
    implements: () => [IBase],
})
export class CustomerContribute extends IBase<CustomerContribute> {
    /**
     * 贡献者 管理员创建的时候可能为空
     */
    @Expose()
    @Type(() => Customer)
    @Field(type => Customer)
    contributor: Customer

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

    constructor(customerContribute: Partial<CustomerContribute>) {
        super(customerContribute)

        if (customerContribute) {
            Object.assign(
                this,
                plainToInstance(CustomerContribute, customerContribute, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}