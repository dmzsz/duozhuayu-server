import { Tag } from './tag.type'
import { IBase } from './interface/base.interface'
import { Field, InterfaceType, ObjectType } from '@nestjs/graphql'
import { Expose, plainToInstance, Type } from 'class-transformer'
import { Image } from './image.type'
import { Brand } from './brand.type'
import { Condition } from '@/shared/enums'
import { UserContribute } from './user-contribute.type'
import { ProductFlaw } from './product-flaw.type'
import { Category } from './category.type'

@ObjectType({
    // resolveType: value => value.constructor.name,
    implements: () => [IBase],
})
export class Product extends IBase<Product> {

    @Expose()
    @Type(() => Brand)
    @Field(() => Brand, { nullable: true })
    brand?: Brand

    @Expose()
    @Type(() => Tag)
    @Field(() => [Tag], { nullable: true })
    tags?: Tag[]

    /**
     * 详情图片
     */
    @Expose()
    @Type(() => Image)
    @Field(() => [Image], { nullable: true })
    images: Image[]


    // @Expose()
    // @Type(() => Category)
    // @Field(() => Category, { nullable: true })
    // category: Category

    // @Expose()
    // @Type(() => ProductFlaw)
    // @Field(() => ProductFlaw, { nullable: true })
    // flaw?: ProductFlaw

    /**
     * 同一商品被用户在多个推荐中提及
     */
    @Expose()
    @Type(() => UserContribute)
    @Field(type => [UserContribute], { nullable: true })
    userContributed: UserContribute[]

    /**
     * 售价
     */
    @Expose()
    @Field()
    price: number

    /**
     * 原价
     */
    @Expose()
    @Field()
    originalPrice: number

    /**
     * 库存数
     */
    @Expose()
    @Field({ nullable: true })
    stockNum: number

    /**
     * 是否有库存
     */
    @Expose()
    @Field({ nullable: true, defaultValue: false })
    stock?: boolean

    /**
     * 成色
     */
    @Expose()
    @Field(() => Condition, { defaultValue: Condition.MEDIUM })
    condition: Condition

    /**
     * 拒绝理由
     */
    @Expose()
    @Field({ nullable: true })
    refusedReason: string

    constructor(product: Partial<Product>) {
        super(product)

        if (product) {
            //     Object.assign(
            //         this,
            //         plainToInstance(Product, product, {
            //             excludeExtraneousValues: true
            //         })
            //     )

            // product.stock = product.stockNum > 0
        }
    }
}