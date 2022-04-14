import { Expose, plainToInstance, Type } from 'class-transformer'
import { Field, ObjectType } from '@nestjs/graphql'
import { IBase } from './interface/base.interface'
import { Image } from './image.type'
import { Product } from './product.type'
import { Category } from './category.type'

@ObjectType({
    implements: () => [IBase],
})
export class Brand extends IBase<Brand> {

    @Expose()
    @Type(() => Product)
    @Field(() => [Product], { nullable: true })
    products?: Product[]

    @Expose()
    @Type(() => Category)
    @Field(() => Category, { nullable: true })
    category: Category

    /**
     * 原名字
     */
    @Expose()
    @Field()
    originalTitle: string

    /**
     * 中文名 可能没有中文的名字
     */
    @Expose()
    @Field({ nullable: true })
    chineseTitle?: string

    @Expose()
    @Field({ nullable: true })
    logo?: string

    /**
     * 简介
     */
    @Expose()
    @Field({ nullable: true })
    intro: string

    /**
     * 介绍图片
     */
    @Expose()
    @Field({ nullable: true })
    image: Image

    constructor(tag: Partial<Brand>) {
        super(tag)

        if (tag) {
            Object.assign(
                this,
                plainToInstance(Brand, tag, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}