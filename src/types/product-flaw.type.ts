import { Exclude, Expose, plainToClass, plainToInstance, Type } from 'class-transformer'
import { Field, ID, InterfaceType, ObjectType } from '@nestjs/graphql'
import { IBase } from './interface/base.interface'
import { Product } from './product.type'
import { Image } from './image.type'
import { FlawDegree } from '@/shared/enums'


/**
 * 产品瑕疵
 */
@ObjectType({
    implements: () => [IBase],
})
export class ProductFlaw extends IBase<ProductFlaw> {
    @Expose()
    @Type(() => Product)
    @Field(() => Product)
    product: Product

    // @Expose()
    // @Type(() => Image)
    // @Field(() => [Image])
    // images?: Image[]

    /**
    * 磨损整体描述
    */
    @Expose()
    @Field()
    flawReason: string

    /**
     * 磨损程度
     */
    flawDegree: FlawDegree

    constructor(productFlaw: Partial<ProductFlaw>) {
        super(productFlaw)

        if (productFlaw) {
            Object.assign(
                this,
                plainToInstance(ProductFlaw, productFlaw, {
                    excludeExtraneousValues: true
                })
            )
        }
    }
}